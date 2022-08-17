const Button = ({ text, style, clickHandler, id }) => {
  return (
    <button className={style} onClick={clickHandler} id={id}>
      {text}
    </button>
  );
};

export default Button;
