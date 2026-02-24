'use client';

import { Story } from '@/types/story';
import Image from 'next/image';
import Button from '@/components/common/Button/Button';
import css from './TravelersStoriesItem.module.css';

interface TravelersStoriesItemProps {
  story: Story;
}

function TravelersStoriesItem({ story }: TravelersStoriesItemProps) {
  const handleClick = () => {
   
  };

  return (
    <li className={css.item}>
      <Image
        src={story.img}
        alt={story.title}
        width={335}
        height={223}
        className={css.image}
      />
      <div className={css.wrapper}>
        <div className={css.info}>
          <p className={css.category}>{story.category.name}</p>
          <h3 className={css.title}>{story.title}</h3>
          <p className={css.article}>{story.article}</p>
        </div>
        <div className={css.publication}>
          <Image
            src={story.ownerId.avatarUrl}
            alt={story.ownerId.name}
            width={48}
            height={48}
            className={css.photo}
          />
          <div>
            <p className={css.name}>{story.ownerId.name}</p>
            <div className={css.dateSaved}>
              <p className={css.date}>{story.date}</p>
              <div className={css.point}></div>
              <p className={css.count}>{story.favoriteCount}</p>
              <svg width="16" height="16">
                <use href="/sprite.svg#icon-bookmark"></use>
              </svg>
            </div>
          </div>
        </div>
        <div className={css.buttons}>
          <Button
            variant=""
            size="large"
            href={`/stories/${story._id}`}
            className={css.buttonView}
          >
            Переглянути статтю
          </Button>
          <Button onClick={() => handleClick()} className={css.buttonAdd}>
            <svg width="24" height="24">
              <use href="/sprite.svg#icon-bookmark"></use>
            </svg>
          </Button>
        </div>
      </div>
    </li>
  );
}

export default TravelersStoriesItem;