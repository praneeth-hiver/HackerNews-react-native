import firebase from "react-native-firebase";

const ref = firebase
  .firestore()
  .collection("cities")
  .doc("London");

firebase
  .firestore()
  .runTransaction(async transaction => {
    const doc = await transaction.get(ref);

    // if it does not exist set the population to one
    if (!doc.exists) {
      transaction.set(ref, { population: 1 });
      // return the new value so we know what the new population is
      return 1;
    }

    // exists already so lets increment it + 1
    const newPopulation = doc.data().population + 1;

    transaction.update(ref, {
      population: newPopulation
    });

    // return the new value so we know what the new population is
    return newPopulation;
  })
  .then(newPopulation => {
    console.log(
      `Transaction successfully committed and new population is '${newPopulation}'.`
    );
  })
  .catch(error => {
    console.log("Transaction failed: ", error);
  });
