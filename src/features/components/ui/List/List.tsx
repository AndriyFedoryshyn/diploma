import { HTMLProps, ReactNode } from "react";

interface ListPropsI<T> extends HTMLProps<HTMLOListElement> {
  renderList: Array<T>;
  classNames: ListClassNames;
  renderItem: (item: T, index: number) => ReactNode;
}

export interface ListClassNames {
  list: string;
  listItem: string;
}

export const List = <T,>({
  renderList,
  classNames,
  renderItem,
}: ListPropsI<T>) => {
  return (
    <ul className={classNames.list}>
      {renderList.map((listItem, index) => (
        <li key={index} className={classNames.listItem}>
          {renderItem(listItem, index)}
        </li>
      ))}
    </ul>
  );
};
