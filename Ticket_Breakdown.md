# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

> ###### Obs: The effort and time estimative can be changed depending on the seniority of the team

### 1 - Generate the customId schema

#### Description

    Generate the customId schema for the database.
    It will consist in a table Many-To-Many between Facility and Agent. And it will contain the foreignKeys and the customId field. Ex:
    {
        facilityId: <id> (Facility FK)
        agentId: <id> (Agent FK)
        customId: <string>
    }
    In this table, the agentId and facilityId must be primaryKey and UNIQUE and The pair (FacilityId, CustomId) also must have unique index
    And the models and repositories on the application must be updated to handle the new schema model.

#### Acceptance Criteria:

    - A migration script to add the new table
    - The models/repositories must reflect the changes
    - In this table, the agentId and facilityId must be primaryKey index created
    - The pair (FacilityId, CustomId) also must have unique index created
    - The functions with queries related both to Agents and Facilities must continue working as expected
    - All tests must continue to work

#### Estimated Effort / Time:

    - Complexity: 5 points
    - Time: about 1-2 days

---

### 2 - Create `setCustomId` function for Facilities

(Depends on #1)

#### Description

    We need to create a new function called `setCustomId`. That will receive as parameters a FacilityId, a AgentId and the customId.
    It must validate the input, and check if there's no already a pair FacilityId/CustomId already registered.
    It then must save this customId in the database.
    The customId must always starts with an letter. (or follow any other pattern)
    When a CustomId is already created, the function must override the previous value
    Must create test cases for this new function:
        - Create new customId sucessfully
        - Update a previous customId sucessfully
        - throw error when receive invalid AgentId
        - throw error when receive invalid FacilityId
        - throw error when already exists pair FacilityId / CustomId
        - throw error when invalid customId pattern
        - throw error when try to update customId, using invalid value
        - throw error when try to update customId, when already exists the new value for the facilityID

#### Acceptance Criteria:

    - The function `setCustomId` must be created inside the appropriate module
    - The function must create/update the database created on #1 ticket
    - All tests must be created and passing

#### Estimated Effort / Time:

    - Complexity: 5 points
    - Time: about 2 days

---

### Update `getShiftsByFacility` function to include CustomId

(Depends on #1)

#### Description

    Update the `getShiftsByFacility` function to handle customId schema.
    Since now we have the new customID relation created on ticket #1, we can consider the new customId field in this query.
    The function should now return the new customId field when it's found in the database.
    So, if for a Facility F, a agent A has a custom Id "A001" and the agent B does not have a custom Id, the query must return the customId along the data for agentA, and only the defaultId for agentB
    Test Cases must be modified to include the new field.
        - check if the new field is present when returning data
        - Check if it stills return the old Id when a agent does not have a customID set

#### Acceptance Criteria:

    - The function query must be updated to join the customID relation table.
    - Must return customIds for Agents
    - Must return default agent Id when there's no customId set
    - All test cases must be created and passing

#### Estimated Effort / Time:

    - Complexity: 5 points
    - Time: about 1-2 days

---

### Update `generateReport` function to include CustomId

(Depends on #1)

#### Description

    Update the `generateReport` function to handle customId schema.
    Since now we have the new customID relation created on ticket #1, we can consider the new customId field in this query instead the agent default Id.
    The function should now return the new customId field when it's found in the database.
    So, if for a Facility F, a agent A has a custom Id "A001" and the agent B does not have a custom Id, the query must return the customId instead the default id for agentA, and only the defaultId for agentB
    Test Cases must be modified to include the new field.
        - Check if is returning the customID in data when it's set
        - Check if it stills return the old Id when a agent does not have a customID set

#### Acceptance Criteria:

    - The function query must be updated to join the customID relation table.
    - Must return customIds for Agents instead of defaultId
    - Must return default agent Id when there's no customId set
    - All test cases must be created and passing

#### Estimated Effort / Time:

    - Complexity: 5 points
    - Time: about 1-2 days
