import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Link, ScrollElement } from "react-scroll";
import { SectionContainer } from "../components/section/sectionContainer";
import { SectionHeader } from "../components/section/sectionHeader";
import { SectionText } from "../components/section/sectionText";
import NextLink from "next/link";

export default function Home() {
  const [activeSection, setActiveSection] = useState<number>(0);
  console.log(ScrollElement);
  const listElement = {
    hidden: { opacity: 0, translateY: 15 },
    show: {
      opacity: 1,
      translateY: 0,
      transition: {
        duration: 0.5,
      },
    },
    selected: {
      opacity: 1,
      translateY: 0,
      backgroundColor: "#00ec14",
      transition: {
        duration: 0.5,
      },
    },
  };
  const listVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };
  const buttonVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delay: 0.4,
        duration: 0.4,
      },
    },
  };
  useEffect(() => {
    console.log(activeSection);
  }, [activeSection]);
  const navItems = [
    "Co to?",
    "Dlaczego?",
    "Zalety",
    "Co można",
    "Co nie można",
    "Skąd wziąć",
  ];
  return (
    <div>
      <div className="min-v-screen flex min-h-screen items-center justify-center bg-[url('https://images.unsplash.com/photo-1601788505117-18947ac4f2e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80')] bg-cover bg-no-repeat">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col items-center justify-center"
        >
          <h1 className="mb-10 select-none text-6xl font-bold text-neutral-300  md:text-9xl">
            Compost it
          </h1>
          <motion.div
            animate={{ translateY: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Link to="nav" smooth={true} duration={700}>
              <IoIosArrowDown size="5rem" className=" fill-neutral-200" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
      <div className=" mx-auto mt-1 max-w-5xl md:flex">
        <nav className="top-0 h-full py-14 px-5 md:sticky md:w-4/12" id="nav">
          <motion.h2 className="ml-3 text-4xl" variants={listElement}>
            Kompostowanie
          </motion.h2>
          <motion.ul
            initial={"hidden"}
            whileInView={"show"}
            viewport={{ once: true }}
            variants={listVariants}
            className="ml-5 flex h-60 flex-col items-start justify-evenly"
          >
            {navItems.map((element, id) => {
              return (
                <Link key={element} to={`section${id}`} smooth={true} duration={700}>
                  <motion.li
                    key={element}
                    className="relative rounded p-0 text-2xl font-medium"
                    variants={listElement}
                  >
                    <motion.div>
                      {element}
                      {activeSection === id ? (
                        <motion.div
                          className="absolute bottom-0  w-full border-2 border-green-400"
                          layoutId="underline"
                        />
                      ) : null}
                    </motion.div>
                  </motion.li>
                </Link>
              );
            })}
          </motion.ul>
        </nav>
        <main className="md:w-8/12">
          <SectionContainer setActiveSection={setActiveSection} id={0}>
            <SectionHeader> Czym jest kompostowanie?</SectionHeader>
            <SectionText>
              Kompostowanie to przetwarzanie materii organicznej w kompost w
              toku naturalnych procesów biochemicznych z udziałem
              mikroorganizmów. W krajach Unii Europejskiej posiadanie
              przydomowego kompostownika jest popularne, a w Polsce również
              staje się zauważalnym trendem, gdyż jest to świetny sposób na
              produkcję tego cennego materiału do użyźniania gleby, a także
              sposób na zagospodarowanie odpady organiczne (bio), powstające
              każdego dnia w naszych domach i ogrodach.
            </SectionText>
          </SectionContainer>
          <SectionContainer setActiveSection={setActiveSection} id={1}>
            <SectionHeader> Dlaczego kompostowanie jest ważne </SectionHeader>
            <SectionText>
              Dzięki niemu ograniczamy ilość wytwarzanych odpadów oraz koszty
              ich transportu i zagospodarowania w instalacjach Zmniejsza ilość
              metanu powstającego na składowiskach w wyniku rozkładających się
              odpadów, który dostając się do atmosfery powoduje globalne
              ocieplenie Pozwala nam uzyskać naturalny i darmowy nawóz, który
              jest bezpieczny dla ludzi i środowiska środowiska - stosowanie go
              sprawia, że rośliny ogrodowe lepiej się rozwijają, zwiększając
              plony warzyw; ponadto kompost ogranicza emisję zanieczyszczeń do
              atmosfery. warzyw; ponadto kompost ogranicza rozwój chwastów i
              pomaga glebie utrzymać wilgoć, pomagając tym samym przetrwać
              pojawiające się coraz częściej okresy suszy. Samodzielne
              wytwarzanie kompostu jest łatwe i nie wymaga specjalistycznej
              wiedzy, natomiast założenie kompostownika jest możliwe nie tylko w
              ogrodzie, ale także w domu lub na balkonie. Kompostownik można w
              łatwy sposób zbudować samodzielnie lub też możemy kupić gotową
              konstrukcję.
            </SectionText>
          </SectionContainer>
          <SectionContainer setActiveSection={setActiveSection} id={2}>
            <SectionHeader> Zalety</SectionHeader>
            <SectionText>
              <ul className="list-disc marker:text-green-600">
                <li>Kompost może posłużyć nam jako tani i skuteczny nawóz.</li>
                <li>
                  Zmniejszenie ogólnej ilości bioodpadów i kosztów ich
                  przetwarzania przez zakłady komunalne.
                </li>
                <li>Niższe opłaty za wywóz śmieci.</li>
                <li>
                  Prosta technologia do zastosowania przez każdego mieszkańca
                </li>
                <li>
                  Bardzo niski koszt inwestycyjny i brak dodatkowych wydatków z
                  czasem.
                </li>
              </ul>
            </SectionText>
          </SectionContainer>
          <SectionContainer setActiveSection={setActiveSection} id={3}>
            <SectionHeader> Co można kompostować</SectionHeader>
            <SectionText>
              <ul className="list-disc marker:text-green-600">
                <li>
                  odpady kuchenne:
                  <ul className="ml-8 list-disc text-left marker:text-green-800">
                    <li>obierki, resztki warzyw i owoców, skorupki jaj</li>
                    <li>fusy z kawy/herbaty</li>
                    <li>czerstwe pieczywo</li>
                    <li>liście, kiełki, części roślin</li>
                    <li>skoszoną trawe, kore drzew i drobne gałęzie</li>
                  </ul>
                </li>
                <li>zwiędłe kwiaty i rośliny doniczkowe</li>

                <li>
                  miękki papier/karton (np. papier do pakowania żywności,
                  chusteczki higieniczne, ręczniki papierowe).
                </li>
              </ul>
            </SectionText>
          </SectionContainer>
          <SectionContainer setActiveSection={setActiveSection} id={4}>
            <SectionHeader> Czego nie można kompostować</SectionHeader>
            <SectionText>
              <ul className="list-disc marker:text-green-600">
                <li>
                  Materiałów takich jak:
                  <ul className="ml-8 list-disc text-left marker:text-green-800">
                    <li>ceramika</li>
                    <li>tworzywa sztuczne</li>
                    <li>metale</li>
                    <li>szkło</li>
                    <li>tkaniny</li>
                  </ul>
                </li>
                <li>
                  materii organicznej, która może zawierać substancje chemiczne:
                  <ul className="ml-8 list-disc text-left marker:text-green-800">
                    <li>zadrukowany papier</li>
                    <li>gazety</li>
                    <li>puste kartonowe opakowania po napojach</li>
                    <li>pomalowane lub zaimpregnowane drewno</li>
                  </ul>
                </li>
                <li>
                  odpady kuchenne:
                  <ul className="ml-8 list-disc text-left marker:text-green-800">
                    <li>mięso</li>
                    <li>kości</li>
                    <li>tłuszcz</li>
                    <li>nabiał</li>
                    <li>całe jaja</li>
                  </ul>
                </li>
                <li>odchody zwierząt</li>
                <li>żwirki dla kotów (ze względów sanitarnych)</li>
                <li>zepsute jedzenie</li>
                <li>gleba, żwir, kamienie</li>
                <li>
                  części chorych lub zaatakowanych przez pasożyty roślin
                  (zarodniki grzybów lub jaja pasożytów mogą przetrwać proces
                  kompostowania i zostać ponownie wprowadzone do gleby)
                </li>
                <li>
                  chwasty, które wytworzyły nasiona (nasiona przetrwają w
                  kompoście i wykiełkują w glebie pokrytej kompostem){" "}
                </li>
                <li>
                  grube gałęzie i igły sosnowe - długo się rozkładają,
                  wydłużając czas potrzebny do wytworzenia kompostu
                </li>
                <li>
                  odpady pochodzenia roślinnego, które mogą być zanieczyszczone,
                  np. chwasty ze środkami ochrony roślin czy skórki z owoców
                  cytrusowych, które zawierają środki konserwujące
                </li>
              </ul>
            </SectionText>
          </SectionContainer>
          <SectionContainer setActiveSection={setActiveSection} id={5}>
            <SectionHeader> Skąd wziąć kompost?</SectionHeader>
            <SectionText>
              Jeżeli chciałbyś mieć kompost lub chciałbyś się go pozbyć zajrzyj
              do naszego sklepu
              <NextLink href="/market" className="flex place-content-center">
                <motion.div
                  initial={"hidden"}
                  whileInView={"show"}
                  viewport={{ once: true }}
                  variants={buttonVariants}
                  className="mt-10 flex w-28 place-content-center rounded-full bg-green-500 py-2.5 px-5 font-bold text-white "
                >
                  Sklep
                </motion.div>
              </NextLink>
            </SectionText>
          </SectionContainer>
        </main>
      </div>
      <footer className="v-max flex items-center justify-center bg-neutral-800 py-6 text-3xl text-neutral-200">
        Hack Yeah! 2022
      </footer>
    </div>
  );
}
