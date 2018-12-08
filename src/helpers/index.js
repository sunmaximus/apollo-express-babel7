const promisify = query => new Promise((resolve, reject) => {
  query.exec((err, data) => {
    if (err) reject(err);
    else resolve(data);
  });
});

const returnOnError = (operation, alternative) => {
  try {
    return operation();
  } catch (e) {
    return alternative;
  }
};

// const promisify = async (query) => {
//   try {
//     return await query;
//   } catch (err) {
//     console.log(err);
//     return err;
//   }
// };

export { promisify, returnOnError };
