import { styled } from 'styled-components';

export const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-width: 40rem;
  background-color: #00000099;
  color: var(--color-third);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 500;
  cursor: default;

  > section {
    background-color: var(--color-grey-9);
    padding: 1.2rem;
    border-radius: 0.6rem;
    border: 0.2rem solid var(--color-fourth);

    > form {
      width: 30.9rem;
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
      background-color: var(--color-grey-9);
      padding: 1.8rem;
      border-radius: 0.6rem;
      position: relative;

      > svg {
        position: absolute;
        right: -1rem;
        top: -1rem;
        width: 3rem;
        height: 3rem;
        cursor: pointer;
      }

      > h2 {
        text-align: center;
        margin-bottom: 2rem;
        font-size: 2.2rem;
        color: var(--color-primary);
        cursor: default;
        letter-spacing: 0.1rem;
      }

      > ul {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        font-size: 1.2rem;
        max-height: 30rem;
        overflow: auto;
        > li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: 0.1rem solid var(--color-primary);
          padding: 1.2rem 0.8rem;
          border-radius: 0.5rem;

          &:hover {
            background-color: var(--color-secundary);
            cursor: pointer;
          }
        }
      }

      > button {
        font-size: 1.5rem;
        padding: 1rem;
        border: 0.1rem solid transparent;
        border-radius: 0.6rem;
        text-transform: uppercase;
        letter-spacing: 0.1rem;
        font-weight: 600;
        color: var(--color-primary);
        background-color: var(--color-grey-7);

        &:hover {
          background-color: var(--color-secundary);
          cursor: pointer;
          border: 0.1rem solid var(--color-primary);
        }
      }

      > div {
        display: flex;
        flex-direction: column;
        justify-content: end;
        gap: 0.2rem;
        position: relative;

        > input {
          padding: 1.2rem 0.8rem;
          border: 0.1rem solid var(--color-primary);
          border-radius: 0.6rem;
          background-color: var(--color-grey-8);
          letter-spacing: 0.1rem;

          &:focus {
            outline: none;
            border-color: var(--color-primary);
            box-shadow: 0 0 0.2rem var(--color-fourth);
          }

          &:focus + label {
            top: -1.8rem;
            left: 0.2rem;
            opacity: 1;
            color: var(--color-primary);
          }

          &:not(:placeholder-shown) + label {
            top: -1.8rem;
            left: 0.2rem;
          }

          ::placeholder {
            font-size: 1.4rem;
            letter-spacing: 0.1rem;
          }
        }

        > label {
          position: absolute;
          top: 1.1rem;
          left: 0.7rem;
          font-size: 1.4rem;
          letter-spacing: 0.1rem;
          padding-left: 0.2rem;
          transition: 0.2s ease-out;
          opacity: 0.4;
        }

        > p {
          font-size: 1.3rem;
          color: red;
        }

        > span {
          position: absolute;
          right: 1rem;
          top: 1rem;
          cursor: pointer;
          opacity: 0.5;
        }

        > button {
          font-size: 1.5rem;
          padding: 1rem;
          border: 0.1rem solid transparent;
          border-radius: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.1rem;
          font-weight: 600;
          color: var(--color-primary);
          background-color: var(--color-grey-7);

          &:hover {
            background-color: var(--color-secundary);
            cursor: pointer;
            border: 0.1rem solid var(--color-primary);
          }
        }
      }
    }
  }
`;
