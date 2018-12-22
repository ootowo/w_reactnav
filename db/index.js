import PouchDB from "pouchdb-react-native";

const db = new PouchDB("makrocore");
export const setData = (data, cb) => {
  db.get(data._id)
    .then(doc => {
      if (doc) {
        db.put({ ...data, _rev: doc._rev })
          .then(res => {
            cb(null, res);
          })
          .catch(error => {
            cb(error, null);
          });
      } else {
        db.post(data)
          .then(res => {
            cb(null, res);
          })
          .catch(error => {
            cb(error, null);
          });
      }
    })
    .catch(error => {
      db.post(data)
        .then(res => {
          cb(null, res);
        })
        .catch(error => {
          cb(error, null);
        });
    });
};

export const getData = (id, cb) => {
  db.get(id)
    .then(res => {
      cb(null, res);
    })
    .catch(error => {
      cb(error, null);
    });
};

export const removeData = (id, cb) => {
  db.get(id)
    .then(doc => {
      db.remove(doc);
      cb(true, null);
    })
    .catch(error => {
      cb(false, error);
    });
};
