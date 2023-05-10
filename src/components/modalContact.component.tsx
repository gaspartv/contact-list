import { GlobalContext } from '@/contexts/global.context';
import { IContacts, IcontactCreate } from '@/interfaces/contacts.interfaces';
import { StyledModal } from '@/styles/modal.styles';
import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const ModalContact = () => {
  const modalRef = React.useRef<HTMLDivElement>(null);

  const {
    setModalContact,
    setContacts,
    contacts,
    contactInfo,
    setModalNewPhone,
  } = React.useContext(GlobalContext);

  const [contactEdit, setContactEdit] = React.useState(contactInfo);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IcontactCreate>({
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().max(100).required(),
        age: yup.number().max(999).required(),
      })
    ),
  });

  const handle = async (data: IcontactCreate) => {
    try {
      const newContact = await toast.promise(
        fetch('/api/contact/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }).then((res) => res.json()),
        {
          pending: 'Aguardando...',
          success: 'Contato deletado com sucesso.',
        },
        {
          className: 'my-toast-sucess',
          autoClose: 5000,
        }
      );

      setContacts([newContact, ...contacts]);

      setModalContact(false);
    } catch ({ response }: any) {
      toast.error(response.data.message, {
        autoClose: 5000,
        className: 'my-toast-error',
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await toast.promise(
        fetch(`/api/phone/delete/${id}`, {
          method: 'DELETE',
        }),
        {
          pending: 'Aguardando...',
          success: 'Telefone deletado com sucesso.',
        },
        {
          className: 'my-toast-sucess',
          autoClose: 5000,
        }
      );

      const findContact = contacts.find((el) => el.id === contactInfo?.id);

      const filter = contacts.filter((el) => el.id !== contactInfo?.id);

      const filterPhone = findContact?.phone.filter((el) => el.id !== id);

      const editContact = {
        ...findContact!,
        phone: filterPhone!,
      };

      setContacts([editContact!, ...filter]);

      setModalContact(false);
    } catch ({ response }: any) {
      toast.error(response.data.message, {
        autoClose: 5000,
        className: 'my-toast-error',
      });
    }
  };

  const handleEdit = async (data: IContacts) => {
    try {
      const res = await toast.promise(
        fetch(`/api/contact/edit/${data.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }).then((res) => res.json()),
        {
          pending: 'Aguardando...',
          success: 'Contato editado com sucesso.',
        },
        {
          className: 'my-toast-sucess',
          autoClose: 5000,
        }
      );

      const filter = contacts.filter((el) => el.id !== data.id);

      setContacts([res, ...filter]);
      setContactEdit(res);
      setModalContact(false);
    } catch (e: any) {
      toast.error(e.response.data.message, {
        autoClose: 5000,
        className: 'my-toast-error',
      });
    }
  };

  const handleDeleteContact = async (id: number) => {
    try {
      await toast.promise(
        fetch(`/api/contact/delete/${id}`, {
          method: 'DELETE',
        }),
        {
          pending: 'Aguardando...',
          success: 'Contato deletado com sucesso.',
        },
        {
          className: 'my-toast-sucess',
          autoClose: 5000,
        }
      );

      const filter = contacts.filter((el) => el.id !== id);

      setContacts(filter);
      setModalContact(false);
    } catch ({ response }: any) {
      toast.error(response.data.message, {
        autoClose: 5000,
        className: 'my-toast-error',
      });
    }
  };

  const preventSubmit = (event: any) => {
    if (event.key === 'Enter') event.preventDefault();
    if (event.key === 'Escape') {
      event.preventDefault();
      setModalContact(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', preventSubmit);
    return () => {
      document.removeEventListener('keydown', preventSubmit);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !(modalRef.current as HTMLElement).contains(event.target as HTMLElement)
      ) {
        setModalContact(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalRef]);

  return (
    <StyledModal>
      <section className="modal" ref={modalRef}>
        <form onSubmit={handleSubmit(handle)}>
          <CloseIcon
            fontSize="large"
            color="disabled"
            onClick={() => {
              setModalContact(false);
            }}
          />
          <h2>Contato de {contactInfo?.name}</h2>
          <div style={{ marginBottom: '20px' }}>
            <input
              {...register('name')}
              id="name"
              name="name"
              type="text"
              value={contactEdit?.name}
              onChange={(e) =>
                setContactEdit({
                  ...contactEdit!,
                  name: e.target.value,
                })
              }
            />
            <label htmlFor="">Nome</label>
            <p>{errors.name && errors.name.message}</p>
          </div>

          <div>
            <input
              {...register('age')}
              id="age"
              name="age"
              type="number"
              value={contactEdit?.age}
              max={999}
              onChange={(e) =>
                setContactEdit({
                  ...contactEdit!,
                  age: Number(e.target.value),
                })
              }
            />
            <label htmlFor="">Idade</label>
            <p>{errors.age && errors.age.message}</p>
          </div>

          <ul>
            {contactEdit?.phone?.map((el) => (
              <li key={el.id}>
                <p>
                  <strong>Telefone: </strong>
                  {el.num}
                </p>
                <DeleteForeverIcon
                  color="error"
                  onClick={() => handleDelete(el.id)}
                />
              </li>
            ))}
          </ul>

          <button
            style={{
              width: '100%',
            }}
            onClick={(event) => {
              event.preventDefault();
              setModalContact(false);
              setModalNewPhone(true);
            }}
          >
            Novo número
          </button>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
            }}
          >
            <button
              style={{
                width: '100%',
              }}
              onClick={(event) => {
                event.preventDefault();
                handleDeleteContact(contactEdit?.id!);
              }}
            >
              Deletar
            </button>
            <button
              style={{
                width: '100%',
              }}
              onClick={(event) => {
                event.preventDefault();
                handleEdit(contactEdit!);
              }}
            >
              Editar
            </button>
          </div>
        </form>
      </section>
    </StyledModal>
  );
};

export default ModalContact;
