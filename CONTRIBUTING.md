# Contributing to TicTacGo

Thank you for your interest in contributing to TicTacGo! To ensure smooth collaboration, please follow the workflow outlined below.

## Workflow

1. **Clone the Remote GitHub Repository**
   - Clone the repository along with all remote branches.
     ```bash
     git clone --recurse-submodules https://github.com/ydvaakash/tictacgo.git

     cd tictacgo

     git fetch --all
     ```

2. **Synchronize Your Local Repository**
   - Before creating a new branch, make sure your local repository is up to date with the remote repository.
     ```bash
     git checkout main
     git pull origin main
     ```

3. **Decide Your Task**
   - Determine if you want to work on a feature or fix a bug.

4. **Create and Checkout a New Branch**
   - For a new feature:
     ```bash
     git checkout -b feature/my-feature
     ```
   - For a bug fix:
     ```bash
     git checkout -b bugfix/my-bugfix
     ```

5. **Make Your Changes**
   - Implement your feature or bug fix in the new branch.

6. **Rebase Your Branch**
   - Rebase your changes onto the latest `dev` branch to avoid merge conflicts.
     ```bash
     git fetch origin
     git rebase origin/dev
     ```

7. **Run Tests**
   - Ensure that all tests pass before committing your changes.

8. **Stage and Commit Your Changes**
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

9. **Push Your Changes to GitHub**
   - Push your changes to the corresponding branch on GitHub:
     ```bash
     git push origin feature/my-feature
     ```
   - Or for bug fixes:
     ```bash
     git push origin bugfix/my-bugfix
     ```

10. **Create a Pull Request**
    - Open a pull request from your feature branch or bugfix branch to the `dev` branch. Include a clear description of your changes and reference any relevant issues.

11. **Code Review**
    - Your pull request will be reviewed. If it meets the required standards and guidelines, it will be merged into the `dev` branch.

12. **Merging to Main**
    - The updated code in the dev branch will eventually be moved to the main branch.

## Additional Guidelines

   - Code Style: Ensure your code follows the project's coding standards.
   - Testing: Run all tests to ensure your changes don't break existing functionality.
   - Documentation: Update documentation as necessary to reflect your changes.
   - Commit Messages: Write clear and concise commit messages. Refer to the [Conventional Commits](https://www.conventionalcommits.org/) specification for guidance.

## Contact

If you have any questions or need further assistance, feel free to contact the project maintainers.
