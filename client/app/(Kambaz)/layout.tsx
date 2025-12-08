"use client";
import { ReactNode } from "react";
import KambazNavigation from "./Navigation";
import "./styles.css";
import store, { persistor } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function KambazLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="d-flex" id="wd-kambaz">
          <div>
            <KambazNavigation />
          </div>
          <div className="flex-fill ps-3 wd-main-content-offset">{children}</div>
        </div>
      </PersistGate>
    </Provider>
  );
}
