require "<%= filename %>"
require "benchmark"

describe <%= classname %> do

	before :each do
		puts "before each test"
	end

	before :all do
		puts "before all tests"
	end

	after :each do
		puts "after each test"
	end

	after :all do
		puts "after all tests"
	end

	describe "#meth1" do
		context "particular scenario of meth1" do
			it "should behave properly" do
				puts @num
				expect(true).to eql true
			end

			it "should run fast" do
				puts @num
				run1 = Benchmark.measure do
					#run some method
				end
			end

		end
	end
end