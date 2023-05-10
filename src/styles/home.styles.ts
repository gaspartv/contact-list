import { styled } from 'styled-components';

export const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  > h1 {
    font-size: 3.2rem;
    margin-top: 3rem;
  }

  > div {
    display: flex;
    flex-direction: column;
    width: 32rem;

    > button {
      margin-top: 3rem;
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
      margin-top: 3rem;

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
    }

    > section {
    }

    > ul {
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
      margin-top: 3rem;

      > li {
        display: flex;
        justify-content: space-between;
        font-size: 1.2rem;
        border: 0.1rem solid var(--color-primary);
        padding: 1rem;
        border-radius: 0.5rem;
        cursor: pointer;
        background-color: var(--color-grey-8);
        color: var(--color-grey-3);

        &:hover {
          background-color: var(--color-secundary);
          border: 0.1rem solid var(--color-grey-1);
          color: var(--color-grey-1);
        }
      }
    }
  }
`;
