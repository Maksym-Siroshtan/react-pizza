import { Link } from "react-router-dom";

import styles from "./NotFoundBlock.module.scss";

function NotFoundBlock() {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Вибачте, сторінка яку Ви шукаєте недоступна.
      </h1>
      <p>
        Серед можливих причин збою можуть бути перенесення матеріалу в інше
        місце, його видалення, недоречне посилання та ін. <br />
        Щиро бажаємо Вам знайти на нашому сайті інформацію, що Вас цікавить!
      </p>

      <Link to="/" className="button button--black">
        <span>Повернутися назад</span>
      </Link>
    </div>
  );
}

export default NotFoundBlock;
