import {
  fetchCompaniesAction,
  fetchCompaniesDetailsAction
} from "../redux/actions/companiesActions";

// export const fetchCompanies = () => dispatch => {
//   fetch("https://recruitment.hal.skygate.io/companies")
//     .then(res => res.json())
//     .then(res => {
//       if (res.error) {
//         throw res.error;
//       }
//       dispatch(fetchCompaniesAction(res));
//       return res;
//     })
//     .then(data => {
//       data.map(item => {
//         fetch(`https://recruitment.hal.skygate.io/incomes/${item.id}`)
//           .then(res => res.json())
//           .then(res => {
//             if (res.error) {
//               throw res.error;
//             }
//             dispatch(fetchCompaniesDetailsAction(res));
//             return res.companiesDetails;
//           })
//           .catch(error => {
//             dispatch(error);
//           });
//       });
//     })
//     .catch(error => {
//       dispatch(error);
//     });
// };

export const fetchCompanies = () => async dispatch => {
  let response = await fetch("https://recruitment.hal.skygate.io/companies");
  let result = await response.json();
  let details = [];
  dispatch(fetchCompaniesAction(result));

  await Promise.all(
    result.map(async item => {
      let res = await fetch(
        `https://recruitment.hal.skygate.io/incomes/${item.id}`
      );
      let secoundResult = await res.json();
      details.push(secoundResult);
    })
  );

  dispatch(fetchCompaniesDetailsAction(details));
};
