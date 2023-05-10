import { IContacts } from '@/interfaces/contacts.interfaces';
import React from 'react';

interface IContextProps {
  children: React.ReactNode;
}

interface IGlobalContext {
  contacts: IContacts[];
  setContacts: React.Dispatch<React.SetStateAction<IContacts[]>>;

  modalNewContact: boolean;
  setModalNewContact: React.Dispatch<React.SetStateAction<boolean>>;

  modalContact: boolean;
  setModalContact: React.Dispatch<React.SetStateAction<boolean>>;

  modalNewPhone: boolean;
  setModalNewPhone: React.Dispatch<React.SetStateAction<boolean>>;

  contactInfo: IContacts | null;
  setContactInfo: React.Dispatch<React.SetStateAction<IContacts | null>>;
}

export const GlobalContext = React.createContext({} as IGlobalContext);

const GlobalProvider = ({ children }: IContextProps) => {
  const [contacts, setContacts] = React.useState<IContacts[]>([]);

  const [modalNewContact, setModalNewContact] = React.useState(false);

  const [modalContact, setModalContact] = React.useState(false);

  const [modalNewPhone, setModalNewPhone] = React.useState(false);

  const [contactInfo, setContactInfo] = React.useState<IContacts | null>(null);

  React.useEffect(() => {
    const contacts = async () => {
      const getContacts = await fetch('/api/contact/get').then((res) =>
        res.json()
      );

      setContacts(getContacts);
    };
    contacts();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        contacts,
        setContacts,
        modalNewContact,
        setModalNewContact,
        modalContact,
        setModalContact,
        modalNewPhone,
        setModalNewPhone,
        contactInfo,
        setContactInfo,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
