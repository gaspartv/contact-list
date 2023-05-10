import CreateNewContact from '@/components/modalAddContact.component';
import ModalContact from '@/components/modalContact.component';
import ModalNewPhone from '@/components/modalNewPhone.component';
import { GlobalContext } from '@/contexts/global.context';
import { IContacts } from '@/interfaces/contacts.interfaces';
import { StyledMain } from '@/styles/home.styles';
import React from 'react';

const HomePage = () => {
  const {
    contacts,
    modalNewContact,
    setModalNewContact,
    modalContact,
    setModalContact,
    setContactInfo,
    modalNewPhone,
  } = React.useContext(GlobalContext);

  const [contactsFilter, setContactsFilter] = React.useState<IContacts[]>([]);

  const [search, setSearch] = React.useState('all');

  React.useEffect(() => {
    const searchContact = () => {
      if (search === 'all') {
        return setContactsFilter(contacts);
      }

      const filter = contacts.filter((el) =>
        el.name.toLowerCase().includes(search.toLowerCase())
      );

      return setContactsFilter(filter);
    };

    searchContact();
  }, [contacts, search]);

  return (
    <>
      {modalNewContact && <CreateNewContact />}
      {modalContact && <ModalContact />}
      {modalNewPhone && <ModalNewPhone />}
      <StyledMain>
        <h1>Minha lista de contatos</h1>

        <div>
          <button
            onClick={(event) => {
              event.preventDefault();
              setModalNewContact(true);
            }}
          >
            Novo contato
          </button>
          <div>
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              placeholder=" "
            />
            <label>Pesquisar contato</label>
          </div>
          <ul>
            {contactsFilter.map((el) => (
              <li
                key={el.id}
                onClick={() => {
                  setContactInfo(el);
                  setModalContact(true);
                }}
              >
                <p>
                  <strong>Nome: </strong>
                  {el.name}
                </p>
                <p>
                  <strong>Age: </strong>
                  {el.age}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </StyledMain>
    </>
  );
};

export default HomePage;
