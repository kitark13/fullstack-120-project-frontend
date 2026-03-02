import clsx from "clsx";
import styles from "./Button.module.css";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "saved";
  size?: "large" | "small";
  iconOnly?: boolean;
}

export default function Button({
  variant = "primary",
  size = "large",
  iconOnly = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        iconOnly && styles.iconOnly,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

// Приклади використання:

// Текстова кнопка
//   < Button > Save</ >

//       <Button variant="secondary">
//   Cancel
//   </Button>

//   Маленька текстова
//   < Button size = "small" > Edit</ >

// <Button variant="secondary" size="small">
//   Back
// </Button>

//   Іконка велика
// <Button iconOnly aria-label="Save">
//   <svg>
//     <use href="#icon-save" />
//   </svg>
// </Button >

//   Іконка мала
// <Button size="small" iconOnly aria-label="Edit">
//   <svg>
//     <use href="#icon-edit" />
//   </svg>
// </Button>
