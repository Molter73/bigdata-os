use std::{convert::TryFrom, fmt::Display};

use chrono::NaiveDate;
use efflux::prelude::*;

fn main() {
    efflux::run_mapper(MonthCounterMapper);
}

#[derive(Debug)]
enum Token<'a> {
    Str(&'a str),
    Int(i64),
    NA,
}

#[derive(Debug)]
struct Lexer<'a> {
    input: &'a str,
    pos: usize,
}

impl<'a> Lexer<'a> {
    fn new(input: &'a [u8]) -> Self {
        let input = std::str::from_utf8(input).unwrap();
        Lexer { input, pos: 0 }
    }
}

impl<'a> Iterator for Lexer<'a> {
    type Item = Token<'a>;

    fn next(&mut self) -> Option<Self::Item> {
        let leftover = &self.input[self.pos..];
        if leftover.is_empty() {
            return None;
        }

        let leftover = match leftover.strip_prefix(',') {
            Some(leftover) => {
                self.pos += 1;
                leftover
            }
            None => leftover,
        };

        let token = match leftover.strip_prefix('"') {
            Some(leftover) => {
                let offset = leftover.find('"')?;
                self.pos += offset + 2;
                let leftover = &leftover[..offset];

                Token::Str(leftover)
            }
            None => {
                let offset = match leftover.find(',') {
                    Some(i) => i,
                    None => leftover.len(),
                };
                self.pos += offset;

                let leftover = &leftover[..offset];
                if leftover == "NA" {
                    Token::NA
                } else {
                    Token::Int(leftover.parse::<i64>().unwrap())
                }
            }
        };
        Some(token)
    }
}

enum PlayerDataError {
    ParseError(String),
}

impl Display for PlayerDataError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            PlayerDataError::ParseError(e) => write!(f, "{e}"),
        }
    }
}

#[derive(Debug, Default)]
struct PlayerData<'a> {
    nfl_id: u64,
    height: &'a str,
    weight: u64,
    birth_date: Option<NaiveDate>,
    college_name: &'a str,
    position: &'a str,
    display_name: &'a str,
}

impl<'a> TryFrom<&'a [u8]> for PlayerData<'a> {
    type Error = PlayerDataError;

    fn try_from(value: &'a [u8]) -> Result<Self, Self::Error> {
        let lexer = Lexer::new(value);
        let mut player = PlayerData::default();
        for elem in lexer.enumerate() {
            match elem {
                (0, Token::Int(i)) => player.nfl_id = i as u64,
                (1, Token::Str(s)) => player.height = s,
                (2, Token::Int(i)) => player.weight = i as u64,
                (3, Token::Str(s)) => {
                    let date = if let Ok(date) = NaiveDate::parse_from_str(s, "%Y-%m-%d") {
                        date
                    } else if let Ok(date) = NaiveDate::parse_from_str(s, "%m/%d/%Y") {
                        date
                    } else {
                        return Err(PlayerDataError::ParseError(format!("Invalid date '{s}'")));
                    };
                    player.birth_date = Some(date);
                }
                (3, Token::NA) => player.birth_date = None,
                (4, Token::Str(s)) => player.college_name = s,
                (5, Token::Str(s)) => player.position = s,
                (6, Token::Str(s)) => player.display_name = s,
                (i, t) => {
                    return Err(PlayerDataError::ParseError(format!(
                        "Unknown element: ({i}) {t:?}"
                    )))
                }
            }
        }
        Ok(player)
    }
}

struct MonthCounterMapper;

impl Mapper for MonthCounterMapper {
    fn map(&mut self, _key: usize, value: &[u8], ctx: &mut Context) {
        let player = match PlayerData::try_from(value) {
            Ok(p) => p,
            Err(e) => {
                eprintln!("{e}");
                return;
            }
        };

        match player.birth_date {
            Some(date) => {
                let month = date.format("%B").to_string();
                ctx.write(month.as_bytes(), &[1]);
            }
            None => ctx.write(b"NA", &[1]),
        };
    }
}
