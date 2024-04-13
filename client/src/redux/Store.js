import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserSliceReducer from "./user/UserSlice";
import NavigationSliceReducer from "./Navigation/NavigationSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import AddSmsterSliceReducer from "./AddSmster/AddSmsterSlice";
import SubmittedApplicationSliceReducer from "./SubmittedApplications/SubmittedApplicationSlice";
import OpenApplicationSliceReducer from "./openApplication/OpenApplicationSlice";
import applicationSliceReducer from "./Application/ApplicationSlice";

const rootPersist = combineReducers({
  user: UserSliceReducer,
  navigation: NavigationSliceReducer,
  transcript: AddSmsterSliceReducer,
  submittedApplications: SubmittedApplicationSliceReducer,
  openApplications: OpenApplicationSliceReducer,
  application: applicationSliceReducer,
});
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};
const persistedRrducer = persistReducer(persistConfig, rootPersist);
export const store = configureStore({
  reducer: persistedRrducer,
});
export const persistor = persistStore(store);
