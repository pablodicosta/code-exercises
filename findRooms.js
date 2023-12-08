/* 
A warehouse is divided into rooms of sizes s0, s1, ..., sn 
We would like to rent storage space of size exactly s.
But only complete rooms can be rented, and none of the given sizes equals s.
The next option is to rent two rooms of total size s, that is, find two
indices i and j with si + sj = s, i ≠ j or figure out that no 2-room solution exists.
Write a function findRooms(rooms, s), That takes as input a non sorted list of room sizes and a
target storage s. That returns a list of 2 rooms whose sum equals s if two such rooms
exist, otherwise return an empty list.

Sample input: rooms = [4, 7, 2, 9, 1, 3, 5],
s = 12
Output: [9, 3]
*/

const findRooms = (rooms, s) => {
   let result = [];

   rooms.forEach((roomA, i) => {
      if (roomA < s) {
         rooms.forEach((roomB, j) => {
            if (i !== j && roomA + roomB === s) result = [roomA, roomB];
         });
      }
   });

   return result;
};

console.log(findRooms([4, 7, 2, 9, 1, 3, 5], 8));
