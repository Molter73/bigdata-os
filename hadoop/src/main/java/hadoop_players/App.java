package hadoop_players;

import java.io.IOException;
import java.util.ArrayList;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;

public class App {
	public static class Lexer {
		public Lexer(String input_) {
			input = input_;
		}

		private void eatWhitespace() {
			while (Character.isWhitespace(input.charAt(position))) {
				position++;
			}
		}

		public boolean done() {
			return position >= input.length();
		}

		public String nextToken() {
			if (done()) {
				return "";
			}

			String res = "";
			eatWhitespace();

			if (input.charAt(position) == '"') {
				position++;
				int offset = position;
				while (input.charAt(offset) != '"') {
					offset++;
				}

				res = input.substring(position, offset);
				position = offset + 1; // update position, skipping the closing quote
			} else {
				int offset = position + 1;
				while (offset < input.length() && input.charAt(offset) != ',' && input.charAt(offset) != '\n') {
					offset++;
				}
				res = input.substring(position, offset);
				position = offset;
			}

			// Skip ',' or go above the string limit to mark end of lexing
			position++;
			return res;
		}

		private String input;
		private int position = 0;
	}

	public static class PositionMapper extends Mapper<Object, Text, Text, IntWritable> {
		private Text initialsToPosition(String initials) {
			switch (initials) {
				case "C":
					return new Text("Center");
				case "CB":
					return new Text("Cornerback");
				case "DB":
					return new Text("Defensive Back");
				case "DE":
					return new Text("Defensive End");
				case "DT":
					return new Text("Defensive Tackle");
				case "FB":
					return new Text("Fullback");
				case "FS":
					return new Text("Free Safety");
				case "G":
					return new Text("Gunner");
				case "ILB":
					return new Text("Inside Linebacker");
				case "LS":
					return new Text("Long Snapper");
				case "MLB":
					return new Text("Middle Linebacker");
				case "NT":
					return new Text("Nose Tackle");
				case "OLB":
					return new Text("Outside Linebacker");
				case "QB":
					return new Text("Quarterback");
				case "RB":
					return new Text("Running Back");
				case "SS":
					return new Text("Strong Safety");
				case "T":
					return new Text("Tackle");
				case "TE":
					return new Text("Tight End");
				case "WR":
					return new Text("Wide Receiver");
				default:
					return new Text("Unknown");
			}
		}

		@Override
		protected void map(Object key, Text value, Mapper<Object, Text, Text, IntWritable>.Context context)
				throws IOException, InterruptedException {
			Lexer lexer = new Lexer(value.toString());
			ArrayList<String> tokens = new ArrayList<>();

			while (!lexer.done()) {
				tokens.add(lexer.nextToken());
			}

			if (tokens.size() != 7) {
				System.err.println("Invalid number of tokens (" + tokens.size() + "): " + tokens.toString());
				return;
			}

			Text position = initialsToPosition(tokens.get(5).replaceAll("\"", ""));

			// La altura está en format <pies>-<pulgadas>, lo convertimos
			// a milímetros para simplificar su procesamiento.
			String[] heightTokens = tokens.get(1).replaceAll("\"", "").split("-");
			if (heightTokens.length != 2) {
				System.err.println("Invalid height format: " + tokens.get(1));
				return;
			}

			int feet = Integer.parseInt(heightTokens[0]) * 305;
			int inches = Integer.parseInt(heightTokens[1]) * 25;
			IntWritable height = new IntWritable(feet + inches);

			context.write(position, height);
		}
	}

	public static class HeightReducer extends Reducer<Text, IntWritable, Text, IntWritable> {
		@Override
		protected void reduce(Text position, Iterable<IntWritable> heights,
				Reducer<Text, IntWritable, Text, IntWritable>.Context context)
				throws IOException, InterruptedException {
			int sum = 0;
			int entries = 0;

			for (IntWritable height : heights) {
				sum += height.get();
				entries++;
			}

			IntWritable avg = new IntWritable(sum / entries);
			context.write(position, avg);
		}
	}

	public static void main(String[] args) throws Exception {
		Configuration conf = new Configuration();

		Job job = Job.getInstance(conf, "avg-height");
		job.setJarByClass(App.class);
		job.setMapperClass(PositionMapper.class);
		job.setReducerClass(HeightReducer.class);
		job.setOutputKeyClass(Text.class);
		job.setOutputValueClass(IntWritable.class);

		FileInputFormat.addInputPath(job, new Path(args[0]));
		FileOutputFormat.setOutputPath(job, new Path(args[1]));
		System.exit(job.waitForCompletion(true) ? 0 : 1);
	}
}
