interface ListProps {
  children: React.ReactNode;
}

const List = ({ children }: ListProps) => {
  return (
    <ul style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: 0, fontSize: '18px', lineHeight: '28px' }}>
      {children}
    </ul>
  );
}

interface ListItemProps {
  children: string;
}

const ListItem = ({ children }: ListItemProps) => {
  return (<li>{children}</li>);
}

export { List, ListItem };
