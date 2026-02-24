// 'use client';

// import css from './TravellersList.module.css';
// import Card from '@/components/common/Card/Card';
// import Button from '@/components/common/Button/Button';
// import { getUsers } from '@/lib/api/api';
// import { useQuery, keepPreviousData } from '@tanstack/react-query';

// export default function TravellersList() {
//   const {
//     data: response,
//     isSuccess,
//     isError,
//     isLoading,
//   } = useQuery({
//     queryKey: ['users'],
//     queryFn: () => getUsers({ page: 1, perPage: 4 }),
//     placeholderData: keepPreviousData,
//     refetchOnMount: false,
//   });

//   const users = response?.users;

//   return (
//     <div className={css.wrapper}>
//       <ul className={css.list}>
//         {users?.map((user) => (
//           <li key={user._id} className={css.item}>
//             <Card user={user} />
//           </li>
//         ))}
//       </ul>

//       <Button
//         size="large"
//         variant="primary"
//         href="/travelers"
//         className={css.trlBtn}
//       >
//         Переглянути всі
//       </Button>
//     </div>
//   );
// }

'use client';

import css from './TravellersList.module.css';
import Card from '@/components/common/Card/Card';
import Button from '@/components/common/Button/Button';
import { getUsers } from '@/lib/api/api';
import { useQuery, keepPreviousData } from '@tanstack/react-query';




export default function TravellersList() {
  const { data: response, isError, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers({ page: 1, perPage: 4 }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
    

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error...</p>;

  const users = response?.users ?? [];

  return (
    <div className={css.wrapper}>
      <ul className={css.list}>
        {users.map((user) => (
          <li key={user._id} className={css.item}>
            <Card user={user} />
          </li>
        ))}
      </ul>

      <Button
        size="large"
        variant="primary"
        href="/travellers"
        className={css.trlBtn}
      >
        Переглянути всі
      </Button>
    </div>
  );
}