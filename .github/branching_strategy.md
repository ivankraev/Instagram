# Branching strategy

## The general approach to branching used within the organisation.

### 🌞 Good branch names:‌

- nice-kebab-cased-titles
- fixes-footer-links
- 4411290-setup-state-management-integration
- feature/new-design
- hotfix/db-connection
- release-1.2.3

### ​⛈ Bad branch names:‌

- patch-1 - not enough context
- camelCasedBranchNames - camelcase
- PascalCasedBranchNames - pascal case
- long-titles-above-80-chars-{.....} - too long
- #58/something - shell understands it as comment

## Here's a brief overview of how the Gitflow branching strategy works:

- Master Branch: The "master" branch represents the stable and production-ready state of your project. It should only contain code that has been thoroughly tested and is ready for deployment.

- Develop Branch: The "develop" branch serves as the main integration branch for ongoing development work. It is where new features, bug fixes, and other development efforts are merged. This branch is typically more dynamic than the "master" branch.

### The typical workflow in the Gitflow branching strategy involves the following steps:

- Start a new feature: When starting work on a new feature, a developer creates a new branch from the "develop" branch. This feature branch is where the developer makes the necessary changes related to the specific feature or task.

- Development and collaboration: Developers work on their respective feature branches, making regular commits and pushing changes to remote repositories. They can collaborate and share code through pull requests or code reviews.

- Merge to develop: Once a feature is completed and tested, the developer merges their feature branch back into the "develop" branch. This integration step ensures that the new feature is combined with other changes in the project.

- Release preparation: Periodically, when the development on the "develop" branch has reached a stable state, a release is prepared. At this point, a release branch is created from the "develop" branch to focus on release-specific activities, such as bug fixes or final testing.

- Merge to master: After the release branch is thoroughly tested and deemed ready for production, it is merged into the "master" branch. This merge represents a new stable release of the software.

- Hotfixes: If critical issues or bugs are discovered in the "master" branch, hotfix branches can be created from the "master" branch. These branches allow for quick bug fixes that can be merged back into both "master" and "develop" branches.

![Branching strategy](../public/git-model@2x.png)
![Merging](../public/merge-strategy.png)
