"use client";

import { FC, ReactNode } from "react";

import { store } from "@/shared/store/store";

import { Provider } from "react-redux";

interface LayoutClientWrapperPropsI {
  children: ReactNode;
}

export const LayoutClientWrapper: FC<LayoutClientWrapperPropsI> = ({
  children,
}) => {
  return <Provider store={store}>{children}</Provider>;
};
