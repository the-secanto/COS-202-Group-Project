# RULE: NO ONE PUSHES TO main
## Main branch = final clean code only

## STEP-BY-STEP FLOW
________________________________________

1. ### Clone the repo
Each member runs:
git clone <repo-link>
________________________________________

2. ### Create a branch
Before coding:
git checkout -b feature/create-post
Branch name format:
feature/what-you-are-doing
Examples:
•	feature/get-posts 
•	feature/homepage-ui 
•	feature/create-post-form 
________________________________________

3. ### Code your feature
Work ONLY in your branch.
________________________________________

4. ### Commit your work
git add .
git commit -m "Add create post endpoint"
Good commit messages:
•	Add GET /posts endpoint 
•	Build homepage UI 
•	Fix API error 
________________________________________

5. ### Push your branch
git push origin feature/create-post
________________________________________

6. ### Open Pull Request (PR)
On GitHub:
•	Click “Compare & pull request” 
•	Add description: 
o	What you did 
o	What to test 
________________________________________

