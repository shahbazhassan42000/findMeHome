import {createSlice} from "@reduxjs/toolkit";
// import {forEach} from "lodash";


// const user = JSON.parse(localStorage.getItem('user'));

const dogSlice = createSlice({
    name: "Dog",
    initialState: {
        dog: {name: "", breed: "", image: "", age: ""}
    },
    reducers: {
        breedResult(state, action) {
            console.log("BREED RESULT");
            const {name, breed, image, age} = action.payload;
            if (name) state.dog.name = name;
            if (breed) state.dog.breed = breed;
            if (image) state.dog.image = image;
            if (age) state.dog.age = age;
        }
    }
});

const {
    breedResult
} = dogSlice.actions;
export default dogSlice.reducer;
export {breedResult};

//api data
export const headers = {
    "Content-type": "application/json;charset=UTF-8",
    // "authorization": `Bearer ${user && user.token}`
};
//endpoints
const cardURL = "/card";
const userURL = "/user";
const boardURL = "/board";

//action creators
// export const loadUsers = () => apiCallBegan({
//     url: userURL + "/all",
//     headers,
//     onSuccess: usersReceived.type
//
// })
//
//
// export const loadBoards = ({id}) => apiCallBegan({
//     url: boardURL + "/adminBoards/" + id,
//     headers,
//     onSuccess: boardsReceived.type
// });
// export const updateBoard = ({_id, bg, members, title}) => apiCallBegan({
//     url: boardURL,
//     headers,
//     method: 'put',
//     data: {board: {id: _id, bg, members, title}},
//     onSuccess: boardUpdated.type
// })
// export const deleteBoard = ({_id}) => apiCallBegan({
//     url: boardURL + "/" + _id,
//     headers,
//     method: 'delete',
//     onSuccess: boardDeleted.type
// })
//
// export const loadCards = (id) => apiCallBegan({
//     url: cardURL + "/all/" + id,
//     headers,
//     onSuccess: cardsReceived.type
// });
// export const addCard = (data) => apiCallBegan({
//     url: cardURL,
//     method: 'post',
//     data,
//     headers,
//     onSuccess: cardAdded.type
// })
// export const deleteCard = (id) => apiCallBegan({
//     url: cardURL + "/" + id,
//     method: 'delete',
//     headers,
//     onSuccess: cardDeleted.type
// })
// export const updateCard = (card) => {
//     if (card.checked) card.status = "completed";
//     else {
//         const currentDate = DateTime.fromFormat(dateToStr(new Date()), "dd/LL/yyyy");
//         const dueDate = DateTime.fromFormat(card.dueDate, "dd/LL/yyyy");
//         let diff = Interval.fromDateTimes(dueDate, currentDate).length('hours') || Interval.fromDateTimes(currentDate, dueDate).length('hours');
//         if (diff === 0) card.status = "due soon";
//         else {
//             diff = Interval.fromDateTimes(dueDate, currentDate).length('hours');
//             if (isNaN(diff)) {
//                 //tomorrow
//                 card.status = "";
//             } else {
//                 //yesterday
//                 card.status = "overdue";
//             }
//         }
//     }
//     return apiCallBegan({
//         url: cardURL,
//         headers,
//         method: 'put',
//         data: {card},
//         onSuccess: cardUpdated.type
//     })
// }

