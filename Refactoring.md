# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

1. First my first approach was identify the possible outputs for some variations of the input.
2. Then after that I created some test cases that will pass according to the first analysis
3. After that I tried to identify situations that I could avoid some processing like when event is falsy, then I could return the TRIVIAL_PARTITION_KEY, with that I eliminate some ifs
4. Then I kind of avoid a lot of checkings. I inserted a logic to when there's no partitionKey inside event, then it means I could encrypt the whole event
5. Then I use some ternary expressions to have a cleaner code for the verification of event.partitionKey type
6. And just before the returning of the function, I check for the MAX_PARTITION_KEY_LENGTH so I determine if encrypt the candidate or not.
7. I also moved the crypt function to another file, so if the crypt approach changes, we do not need to change in the main function file.
8. After all, I included more test cases with other basic situations. And added a try-catch block on main function to avoid exceptions on handling the crypt
