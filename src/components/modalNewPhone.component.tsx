import { GlobalContext } from '@/contexts/global.context';
import { IPhonesCreate } from '@/interfaces/contacts.interfaces';
import { StyledModal } from '@/styles/modal.styles';
import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const ModalNewPhone = () => {
  const modalRef = React.useRef<HTMLDivElement>(null);

  const {
    setContacts,
    contacts,
    contactInfo,
    modalNewPhone,
    setModalNewPhone,
  } = React.useContext(GlobalContext);

  const [contactEdit, setContactEdit] = React.useState(contactInfo);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPhonesCreate>({
    resolver: yupResolver(
      yup.object().shape({
        num: yup.string().required(),
      })
    ),
  });

  const handle = async (data: IPhonesCreate) => {
    try {
      const newPhone = await toast.promise(
        fetch(`/api/phone/create/${contactInfo?.id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }).then((res) => res.json()),
        {
          pending: 'Aguardando...',
          success: 'Telefone adicionado com sucesso.',
        },
        {
          className: 'my-toast-sucess',
          autoClose: 5000,
        }
      );

      const findContact = contacts.find((el) => el.id === contactInfo?.id);

      const filter = contacts.filter((el) => el.id !== contactInfo?.id);

      const editContact = {
        ...findContact!,
        phone: [newPhone, ...findContact?.phone!],
      };

      setContacts([editContact, ...filter]);

      setModalNewPhone(false);
    } catch (error: any) {
      toast.error(error.response.data.message, {
        autoClose: 5000,
        className: 'my-toast-error',
      });
    }
  };

  const preventSubmit = (event: any) => {
    if (event.key === 'Enter') event.preventDefault();
    if (event.key === 'Escape') {
      event.preventDefault();
      setModalNewPhone(false);
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
        setModalNewPhone(false);
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
              setModalNewPhone(false);
            }}
          />
          <h2>Novo telefone para {contactInfo?.name}</h2>
          <div style={{ marginBottom: '20px' }}>
            <input {...register('num')} id="num" name="num" type="text" />
            <label htmlFor="">Telefone</label>
            <p>{errors.num && errors.num.message}</p>
          </div>

          <div>
            <button>adicionar</button>
          </div>
        </form>
      </section>
    </StyledModal>
  );
};

export default ModalNewPhone;
