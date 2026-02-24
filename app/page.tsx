// import style from "./page.module.css";
import Join from "@/components/home/Join/Join";
import Istorii from "@/components/Istorii/Istorii";

import Block from "@/components/Block/Block";
import TravellersList from "@/components/travellers/TravellersList/TravellersList";

export default function Home() {
  return (
    <main>
     
      <Istorii />
         <Block title="Наші Мандрівники">
            <TravellersList />
      </Block>
       <Join />
    </main>
  );
}
