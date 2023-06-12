# Integration Steps

Follow the steps below to integrate the Plinko front-end with the Plinko back-end to retrieve the path:

1. **Edit the `getBallPositionFromServer` function**: In the Plinko front-end code, locate the function named **`getBallPositionFromServer`** in the file **`src/components/tools.js`**. Edit this function to return the horizontal x value from the back-end.

2. **Store paths in the database**: In the back-end, ensure that all the predefined paths for each amount of rows (found in **`src/utils/pathdata`**) are stored in the database. Create an appropriate database table or collection to store the path data.

3. **Generate a path and determine the end point**: When a Plinko game is initiated, the back-end should generate a path as it does now. Determine the end point based on the generated path, that consists of left or right moves, represented by an array of 1s and 0s.

4. **Retrieve a path from the database**: Using the determined end point, randomly select a path from the corresponding rows amount and end point in the database. Retrieve the selected path from the database, which should include the x values. NOTE - The end points can probably just be stored in the server files, and not in a database. About 365KB in size.

5. **Return the x value to the front-end**: Send the x value of the selected path back to the Plinko front-end as the response from the back-end API. This x value will determine the horizontal position from which the ball should be dropped.

### Example

If **rowsAmount == 10**.
If the end point determined from the path is index 4.
A random path from the database for **rowsAmount == 10** and **end point == 4** is retrieved. Which would be from the **`path/10/rows_10_end_4.json`** file in this repo.
