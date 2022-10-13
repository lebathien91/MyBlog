import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import TableContent from "./TableContent";
import Topic from "./Topic";

const Detail = () => {
  const [activeTopic, setActiveTopic] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const handleOpen = () => {
    setActiveTopic(true);
    setIsMobile(true);
  };

  const handleClose = () => {
    setActiveTopic(false);
    setIsMobile(false);
  };

  return (
    <div className="relative">
      <IoIosArrowForward
        size="1.875rem"
        className={`sticky top-[53px] left-0 p-1 bg-[#dfd9d9] z-30 cursor-pointer ${
          activeTopic && !isMobile && "lg:hidden"
        } ${!activeTopic && !isMobile && "lg:block"} ${
          activeTopic && isMobile && "hidden"
        }`}
        onClick={() => handleOpen()}
      />
      <div className="container flex relative">
        <Topic
          isMobile={isMobile}
          active={activeTopic}
          setActive={handleClose}
        />

        <article className="flex-[7_1_0%] px-[16px]">
          <header className={`${activeTopic ? "pt-8" : ""} pb-4`}>
            <div className="font-semibold text-xl">
              <a href="#"> Topic</a>
              <span>/</span>
              <a href="#">title</a>
            </div>
          </header>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure
          delectus ipsam incidunt tempora molestias atque laborum repellendus!
          Amet, impedit autem ex mollitia numquam doloremque possimus veniam,
          culpa corporis ipsa pariatur. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Consectetur magni voluptate tempora est et quod
          consequatur repudiandae. Ipsa, non tempora rerum consectetur, illum,
          mollitia fugiat doloribus minus est eveniet libero! Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Enim dignissimos ipsum optio
          eius porro quia eligendi excepturi eum mollitia blanditiis ea, nobis,
          cum architecto voluptas laudantium reiciendis obcaecati debitis
          accusantium. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Magnam, officiis! Quisquam voluptatum eligendi corrupti molestias
          fugit quo itaque molestiae suscipit quod aliquid fuga, animi in
          tempora, atque quos cupiditate sapiente? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Sunt, eveniet saepe, sit repudiandae
          beatae excepturi at culpa, explicabo officia praesentium asperiores
          accusamus. Reiciendis dolor praesentium delectus vero ullam quo
          temporibus? Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Consectetur id voluptatibus magni quia enim tenetur. Eaque tenetur,
          provident minus quia explicabo debitis esse omnis quo fugiat doloribus
          tempore nesciunt quae? Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Voluptate quaerat, nisi aut dignissimos molestias
          ullam similique unde, reiciendis a obcaecati fuga praesentium culpa
          consequatur est tempore minus, ea doloribus inventore. Lorem ipsum
          dolor, sit amet consectetur adipisicing elit. Aut explicabo, iste eos
          eligendi voluptatum iusto facilis! Porro mollitia numquam libero nihil
          perspiciatis ea, minima, corrupti officia qui non maxime soluta.
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint ipsam
          explicabo voluptatum voluptates non accusamus cupiditate blanditiis
          sit, nulla illo facere cum expedita ad esse quod reiciendis adipisci
          quis dolore. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Error facilis cum sunt quo explicabo! Quam accusantium error soluta
          ipsam, in aperiam praesentium similique quidem aliquid architecto
          ducimus neque sunt. Quae. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Odit possimus eius numquam officia culpa dolorum
          tenetur, ex quia voluptate quibusdam fuga magnam laborum qui porro.
          Nam accusantium maxime molestias culpa! Lorem ipsum dolor, sit amet
          consectetur adipisicing elit. Doloremque placeat distinctio inventore
          impedit asperiores eaque ab quo porro est! Deleniti id vitae
          reprehenderit iure eveniet impedit ab rem veniam ipsa.Lorem ipsum,
          dolor sit amet consectetur adipisicing elit. Iure delectus ipsam
          incidunt tempora molestias atque laborum repellendus! Amet, impedit
          autem ex mollitia numquam doloremque possimus veniam, culpa corporis
          ipsa pariatur. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Consectetur magni voluptate tempora est et quod consequatur
          repudiandae. Ipsa, non tempora rerum consectetur, illum, mollitia
          fugiat doloribus minus est eveniet libero! Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Enim dignissimos ipsum optio eius porro
          quia eligendi excepturi eum mollitia blanditiis ea, nobis, cum
          architecto voluptas laudantium reiciendis obcaecati debitis
          accusantium. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Magnam, officiis! Quisquam voluptatum eligendi corrupti molestias
          fugit quo itaque molestiae suscipit quod aliquid fuga, animi in
          tempora, atque quos cupiditate sapiente? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Sunt, eveniet saepe, sit repudiandae
          beatae excepturi at culpa, explicabo officia praesentium asperiores
          accusamus. Reiciendis dolor praesentium delectus vero ullam quo
          temporibus? Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Consectetur id voluptatibus magni quia enim tenetur. Eaque tenetur,
          provident minus quia explicabo debitis esse omnis quo fugiat doloribus
          tempore nesciunt quae? Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Voluptate quaerat, nisi aut dignissimos molestias
          ullam similique unde, reiciendis a obcaecati fuga praesentium culpa
          consequatur est tempore minus, ea doloribus inventore. Lorem ipsum
          dolor, sit amet consectetur adipisicing elit. Aut explicabo, iste eos
          eligendi voluptatum iusto facilis! Porro mollitia numquam libero nihil
          perspiciatis ea, minima, corrupti officia qui non maxime soluta.
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint ipsam
          explicabo voluptatum voluptates non accusamus cupiditate blanditiis
          sit, nulla illo facere cum expedita ad esse quod reiciendis adipisci
          quis dolore. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Error facilis cum sunt quo explicabo! Quam accusantium error soluta
          ipsam, in aperiam praesentium similique quidem aliquid architecto
          ducimus neque sunt. Quae. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Odit possimus eius numquam officia culpa dolorum
          tenetur, ex quia voluptate quibusdam fuga magnam laborum qui porro.
          Nam accusantium maxime molestias culpa! Lorem ipsum dolor, sit amet
          consectetur adipisicing elit. Doloremque placeat distinctio inventore
          impedit asperiores eaque ab quo porro est! Deleniti id vitae
          reprehenderit iure eveniet impedit ab rem veniam ipsa.Lorem ipsum,
          dolor sit amet consectetur adipisicing elit. Iure delectus ipsam
          incidunt tempora molestias atque laborum repellendus! Amet, impedit
          autem ex mollitia numquam doloremque possimus veniam, culpa corporis
          ipsa pariatur. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Consectetur magni voluptate tempora est et quod consequatur
          repudiandae. Ipsa, non tempora rerum consectetur, illum, mollitia
          fugiat doloribus minus est eveniet libero! Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Enim dignissimos ipsum optio eius porro
          quia eligendi excepturi eum mollitia blanditiis ea, nobis, cum
          architecto voluptas laudantium reiciendis obcaecati debitis
          accusantium. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Magnam, officiis! Quisquam voluptatum eligendi corrupti molestias
          fugit quo itaque molestiae suscipit quod aliquid fuga, animi in
          tempora, atque quos cupiditate sapiente? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Sunt, eveniet saepe, sit repudiandae
          beatae excepturi at culpa, explicabo officia praesentium asperiores
          accusamus. Reiciendis dolor praesentium delectus vero ullam quo
          temporibus? Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Consectetur id voluptatibus magni quia enim tenetur. Eaque tenetur,
          provident minus quia explicabo debitis esse omnis quo fugiat doloribus
          tempore nesciunt quae? Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Voluptate quaerat, nisi aut dignissimos molestias
          ullam similique unde, reiciendis a obcaecati fuga praesentium culpa
          consequatur est tempore minus, ea doloribus inventore. Lorem ipsum
          dolor, sit amet consectetur adipisicing elit. Aut explicabo, iste eos
          eligendi voluptatum iusto facilis! Porro mollitia numquam libero nihil
          perspiciatis ea, minima, corrupti officia qui non maxime soluta.
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint ipsam
          explicabo voluptatum voluptates non accusamus cupiditate blanditiis
          sit, nulla illo facere cum expedita ad esse quod reiciendis adipisci
          quis dolore. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Error facilis cum sunt quo explicabo! Quam accusantium error soluta
          ipsam, in aperiam praesentium similique quidem aliquid architecto
          ducimus neque sunt. Quae. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Odit possimus eius numquam officia culpa dolorum
          tenetur, ex quia voluptate quibusdam fuga magnam laborum qui porro.
          Nam accusantium maxime molestias culpa! Lorem ipsum dolor, sit amet
          consectetur adipisicing elit. Doloremque placeat distinctio inventore
          impedit asperiores eaque ab quo porro est! Deleniti id vitae
          reprehenderit iure eveniet impedit ab rem veniam ipsa.Lorem ipsum,
          dolor sit amet consectetur adipisicing elit. Iure delectus ipsam
          incidunt tempora molestias atque laborum repellendus! Amet, impedit
          autem ex mollitia numquam doloremque possimus veniam, culpa corporis
          ipsa pariatur. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Consectetur magni voluptate tempora est et quod consequatur
          repudiandae. Ipsa, non tempora rerum consectetur, illum, mollitia
          fugiat doloribus minus est eveniet libero! Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Enim dignissimos ipsum optio eius porro
          quia eligendi excepturi eum mollitia blanditiis ea, nobis, cum
          architecto voluptas laudantium reiciendis obcaecati debitis
          accusantium. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Magnam, officiis! Quisquam voluptatum eligendi corrupti molestias
          fugit quo itaque molestiae suscipit quod aliquid fuga, animi in
          tempora, atque quos cupiditate sapiente? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Sunt, eveniet saepe, sit repudiandae
          beatae excepturi at culpa, explicabo officia praesentium asperiores
          accusamus. Reiciendis dolor praesentium delectus vero ullam quo
          temporibus? Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Consectetur id voluptatibus magni quia enim tenetur. Eaque tenetur,
          provident minus quia explicabo debitis esse omnis quo fugiat doloribus
          tempore nesciunt quae? Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Voluptate quaerat, nisi aut dignissimos molestias
          ullam similique unde, reiciendis a obcaecati fuga praesentium culpa
          consequatur est tempore minus, ea doloribus inventore. Lorem ipsum
          dolor, sit amet consectetur adipisicing elit. Aut explicabo, iste eos
          eligendi voluptatum iusto facilis! Porro mollitia numquam libero nihil
          perspiciatis ea, minima, corrupti officia qui non maxime soluta.
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint ipsam
          explicabo voluptatum voluptates non accusamus cupiditate blanditiis
          sit, nulla illo facere cum expedita ad esse quod reiciendis adipisci
          quis dolore. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Error facilis cum sunt quo explicabo! Quam accusantium error soluta
          ipsam, in aperiam praesentium similique quidem aliquid architecto
          ducimus neque sunt. Quae. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Odit possimus eius numquam officia culpa dolorum
          tenetur, ex quia voluptate quibusdam fuga magnam laborum qui porro.
          Nam accusantium maxime molestias culpa! Lorem ipsum dolor, sit amet
          consectetur adipisicing elit. Doloremque placeat distinctio inventore
          impedit asperiores eaque ab quo porro est! Deleniti id vitae
          reprehenderit iure eveniet impedit ab rem veniam ipsa.Lorem ipsum,
          dolor sit amet consectetur adipisicing elit. Iure delectus ipsam
          incidunt tempora molestias atque laborum repellendus! Amet, impedit
          autem ex mollitia numquam doloremque possimus veniam, culpa corporis
          ipsa pariatur. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Consectetur magni voluptate tempora est et quod consequatur
          repudiandae. Ipsa, non tempora rerum consectetur, illum, mollitia
          fugiat doloribus minus est eveniet libero! Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Enim dignissimos ipsum optio eius porro
          quia eligendi excepturi eum mollitia blanditiis ea, nobis, cum
          architecto voluptas laudantium reiciendis obcaecati debitis
          accusantium. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Magnam, officiis! Quisquam voluptatum eligendi corrupti molestias
          fugit quo itaque molestiae suscipit quod aliquid fuga, animi in
          tempora, atque quos cupiditate sapiente? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Sunt, eveniet saepe, sit repudiandae
          beatae excepturi at culpa, explicabo officia praesentium asperiores
          accusamus. Reiciendis dolor praesentium delectus vero ullam quo
          temporibus? Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Consectetur id voluptatibus magni quia enim tenetur. Eaque tenetur,
          provident minus quia explicabo debitis esse omnis quo fugiat doloribus
          tempore nesciunt quae? Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Voluptate quaerat, nisi aut dignissimos molestias
          ullam similique unde, reiciendis a obcaecati fuga praesentium culpa
          consequatur est tempore minus, ea doloribus inventore. Lorem ipsum
          dolor, sit amet consectetur adipisicing elit. Aut explicabo, iste eos
          eligendi voluptatum iusto facilis! Porro mollitia numquam libero nihil
          perspiciatis ea, minima, corrupti officia qui non maxime soluta.
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint ipsam
          explicabo voluptatum voluptates non accusamus cupiditate blanditiis
          sit, nulla illo facere cum expedita ad esse quod reiciendis adipisci
          quis dolore. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Error facilis cum sunt quo explicabo! Quam accusantium error soluta
          ipsam, in aperiam praesentium similique quidem aliquid architecto
          ducimus neque sunt. Quae. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Odit possimus eius numquam officia culpa dolorum
          tenetur, ex quia voluptate quibusdam fuga magnam laborum qui porro.
          Nam accusantium maxime molestias culpa! Lorem ipsum dolor, sit amet
          consectetur adipisicing elit. Doloremque placeat distinctio inventore
          impedit asperiores eaque ab quo porro est! Deleniti id vitae
          reprehenderit iure eveniet impedit ab rem veniam ipsa.
        </article>

        <TableContent active={activeTopic} />
      </div>
    </div>
  );
};

export default Detail;
