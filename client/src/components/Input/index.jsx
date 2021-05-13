// Styles
import styles from "./input.module.scss";

const Input = ({ label, sublabel, error, ...rest }) => {
  return (
    <div className={styles.Input}>
      <div className={styles.containerLabel}>
        <label>{label}</label>
        <p>{sublabel}</p>
      </div>

      <input {...rest} />
      {error && (
        <div className={styles.InputErrorContainer}>
          <span className={styles.InputError}>{error}</span>
        </div>
      )}
    </div>
  );
};

export default Input;
