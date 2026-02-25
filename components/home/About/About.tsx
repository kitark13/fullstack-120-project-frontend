import styles from './About.module.css';
import React from 'react';

export default function About() {
  return (
    <section className={styles.about}>
      <div className={`container ${styles.container}`}>
        <div className={styles.about_container}>
          <h2 className={styles.about_title}>
            Проєкт, створений для тих, хто живе подорожами
          </h2>
          <p className={styles.about_paragraf}>
            Ми віримо, що кожна подорож — це унікальна історія, варта того, щоб
            нею поділилися. Наша платформа створена, щоб об&apos;єднати людей,
            закоханих у відкриття нового. Тут ви можете ділитися власним
            досвідом, знаходити друзів та надихатися на наступні пригоди разом з
            нами.
          </p>
        </div>
        <OurGoal>
          <li className={styles.ourGoal_section_item}>
            <svg className={styles.svg}>
              <use href='/sprite-final-opt.svg#icon-wand-stars' />
            </svg>
            <h3 className={styles.ourGoal_section_item_title}>Наша місія</h3>
            <p className={styles.ourGoal_section_item_paragraf}>
              Об&apos;єднувати людей через любов до пригод та надихати на нові
              відкриття.
            </p>
          </li>
          <li className={styles.ourGoal_section_item}>
            <svg className={styles.svg}>
              <use href='/sprite-final-opt.svg#icon-travel-luggage-and-bags' />
            </svg>
            <h3 className={styles.ourGoal_section_item_title}>
              Автентичні історії
            </h3>
            <p className={styles.ourGoal_section_item_paragraf}>
              Ми цінуємо справжні, нередаговані враження від мандрівників з
              усього світу.
            </p>
          </li>
          <li className={styles.ourGoal_section_item}>
            <svg className={styles.svg}>
              <use href='/sprite-final-opt.svg#icon-communication' />
            </svg>
            <h3 className={styles.ourGoal_section_item_title}>
              Ваша спільнота
            </h3>
            <p className={styles.ourGoal_section_item_paragraf}>
              Станьте частиною спільноти, де кожен може бути і автором, і
              читачем.
            </p>
          </li>
        </OurGoal>
      </div>
    </section>
  );
}

interface OurGoalprops {
  children: React.ReactNode;
}
function OurGoal({ children }: OurGoalprops) {
  return <ul className={styles.ourGoal_section}>{children}</ul>;
}
