import { GlobalContext } from '@/contexts/global.context';
import { IcontactCreate } from '@/interfaces/contacts.interfaces';
import { StyledModal } from '@/styles/modal.styles';
import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const CreateNewContact = () => {
  const modalRef = React.useRef<HTMLDivElement>(null);

  const { setModalNewContact, setContacts, contacts } =
    React.useContext(GlobalContext);

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
          success: 'Contato criado com sucesso.',
        },
        {
          className: 'my-toast-sucess',
          autoClose: 5000,
        }
      );

      setContacts([newContact, ...contacts]);

      setModalNewContact(false);
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
      setModalNewContact(false);
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
        setModalNewContact(false);
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
              setModalNewContact(false);
            }}
          />
          <h2>Novo contato</h2>
          <div style={{ marginBottom: '20px' }}>
            <input
              {...register('name')}
              id="name"
              name="name"
              type="text"
              placeholder=" "
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
              max={999}
              placeholder=" "
            />
            <label htmlFor="">Idade</label>
            <p>{errors.age && errors.age.message}</p>
          </div>

          <div>
            <button>Adicionar</button>
          </div>
        </form>
      </section>
    </StyledModal>
  );
};

export default CreateNewContact;
