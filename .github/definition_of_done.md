# Definition of done

## An unwritten contract signed by everyone in the organisation.

### We use the definition of done to asses whether or not an enhancement can be considered to be complete (shippable to production).

## Do not mix DoD with acceptance criteria.

### DoD is our general framework to derive and end-to-end process which ensures every common piece of work meets the organisation's quality standards. Whereas, AC is a set of strictly defined targets for each individual (functional) piece of work that must be met before a task is considered to be complete.

## Why is DoD important to us?

### It is vital that every contributor in our organisation is aware of and understands our DoD. This helps us:

- Complete all tasks without introducing any gaps in the process.
- Follow with clarity where we are on our roadmap and what has been completed.
- Know what is expected from every contributor.
- Meet a certain quality of our work which leads to:
  - Lowering the amount of time spend for reworks.
  - Delivering on our promise to create a platform which makes a difference in our society.

## Framework

### The following is a general approach towards DoD, each team is encouraged to derive their own process suitable for the team's functionality in the organisation.

## Development

- Code and unit tests for functionality completed.
- Assumption of meeting Acceptance Criteria.
- Premerge [if applicable] tests and code reviews passed.
- Postmerge [if applicable] tests passed.
- Project builds with no failures.
- Project deployed to dev environment.
- Initial QA performed by the developer. [if this step fails, go back to step 1]
- Feature documentation [if applicable] and tests documentation [if applicable] written.
- Feature QA'ed by a QA engineer against the acceptance criteria. [if this step fails, go back to step 1]
- Official documentation updated.
- Feature marked as completed.

## Release

- All features included in the release are marked as completed. Where a feature is not yet completed, the feature is postponed for the next release.
- Update changelog and release documentation where applicable.
- Current environment is "green" - all unit, functional, integration, E2E and other possible tests are passing.
- Release acceptance criteria is met. [If this step fails, go back to step 1]
- QA functionality of the platform. [If this step fails, go back to step 1]
- QA if any experimental features are exposed to the end user. [If this step fails, go back to step 1]
- Promote the release to the next environment in the pipeline.
- Release successfully deployed to new environment. [If this step fails, go back to step 1]
- Release marked as completed.
