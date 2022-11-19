import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-scroll";
import { SectionContainer } from "../../components/section/sectionContainer";
import { SectionHeader } from "../../components/section/sectionHeader";
import { SectionText } from "../../components/section/sectionText";
export default function Home() {
  const [activeSection, setActiveSection] = useState(0);
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
  useEffect(() => {
    console.log(activeSection);
  }, [activeSection]);
  const navItems = [
    "Co to?",
    "Dlaczego?",
    "Zalety",
    "Co można",
    "Co nie można",
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
          <h1 className="mb-10 select-none text-9xl font-bold text-neutral-300">
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
      <div className=" mx-auto mt-1 flex max-w-5xl">
        <nav className="sticky top-0 h-full w-5/12 py-14 px-5" id="nav">
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
                <motion.li
                  key={element}
                  className={`relative rounded p-0 text-2xl font-medium 
                  
                  `}
                  variants={listElement}
                >
                  <motion.div>
                    {element}
                    {activeSection === id + 1 ? (
                      <motion.div
                        className="absolute bottom-0  w-full border-2 border-green-400"
                        layoutId="underline"
                      />
                    ) : null}
                  </motion.div>
                </motion.li>
              );
            })}
          </motion.ul>
        </nav>
        <main className="w-7/12">
          <SectionContainer setActiveSection={setActiveSection} id={1}>
            <SectionHeader> Czym jest kompostowanie?</SectionHeader>
            <SectionText>
              Kompostowanie to przetwarzanie materii organicznej na kompost w
              drodze naturalnych procesów biochemicznych procesy z udziałem
              mikroorganizmów. W państwach członkowskich UE posiadanie domu
              Kompostownik jest popularny, staje się zauważalnym trendem również
              w Polsce, ponieważ jest to świetny sposób produkować kompost –
              cenny materiał do nawożenia gleby, a także sposób gospodarowania
              odpady organiczne (bio), wytwarzane każdego dnia w naszych domach
              i ogrodach.
            </SectionText>
          </SectionContainer>
          <SectionContainer setActiveSection={setActiveSection} id={2}>
            <SectionHeader> Dlaczego kompostowanie jest ważne </SectionHeader>
            <SectionText>
              Kompostowanie odpadów pozwala nam chronić środowisko, ponieważ: 1
              <br />- zmniejszamy ilość wytwarzanych odpadów oraz koszty ich
              transportu i zagospodarowania w instalacjach – aktywne wdrażanie
              zasady „zero odpadów”,
              <br />- zmniejszamy ilość metanu powstającego na składowiskach w
              wyniku rozkładu odpadów, co powoduje globalne ocieplenie
              przedostając się do atmosfery, <br />- pozwala nam uzyskać
              naturalny i darmowy nawóz, który jest bezpieczny dla ludzi i
              środowiska środowisko – korzystanie z niego sprawia, że ​​rośliny
              ogrodowe lepiej rosną, co zwiększa plony warzywa; ponadto kompost
              ogranicza rozwój chwastów i wspomaga glebę utrzymują wilgoć,
              pomagając w ten sposób przetrwać okresy suszy, które występują
              coraz częściej częściej.
            </SectionText>
          </SectionContainer>
          <SectionContainer setActiveSection={setActiveSection} id={3}>
            <SectionHeader> Zalety</SectionHeader>
            <SectionText>
              - wytwarzanie kompostu, który służy jako wartościowy nawóz, -
              zmniejszenie ogólnej ilości bioodpadów i kosztów ich przetwarzania
              przez instalacje, <br /> - niższa opłata za odbiór odpadów
              komunalnych, <br />- prosta technologia dostępna dla każdego
              obywatela,
              <br />- niski koszt inwestycji i brak nakładów bieżących
            </SectionText>
          </SectionContainer>
          <SectionContainer setActiveSection={setActiveSection} id={4}>
            <SectionHeader> Co można kompostować</SectionHeader>
            <SectionText>
              Co można kompostować:
              <br />- odpady kuchenne, np. obierki, resztki warzyw i owoców,
              skorupki jaj, kawa/herbata fusy, czerstwy chleb,
              <br />- liście, kiełki, łodygi roślin,
              <br />- skoszona trawa,
              <br />- kora drzew i drobne gałęzie, siano,
              <br />- zwiędłych kwiatów i roślin doniczkowych,
              <br />- niezadrukowany i miękki papier/karton (np. papier do
              pakowania żywności, chusteczek, ręczników papierowych)
            </SectionText>
          </SectionContainer>
          <SectionContainer setActiveSection={setActiveSection} id={5}>
            <SectionHeader> Czego nie można kompostować</SectionHeader>
            <SectionText>
              Czego nie należy umieszczać w kompostowniku:
              <br />- materiały takie jak ceramika, tworzywa sztuczne, metale,
              szkło czy tkaniny – nie są kompostowane,
              <br />- materia organiczna, która może zawierać chemikalia, taka
              jak zadrukowany papier lub gazety, pusta kartonowe opakowania
              napojowe, drewno malowane i impregnowane,
              <br />- odpady kuchenne, takie jak mięso, kości, tłuszcz, nabiał
              lub całe jajka, które wydzielają nieprzyjemny zapach podczas
              rozkładu,
              <br />- odchody zwierzęce, żwirek dla kotów (ze względów
              sanitarnych),
              <br />- zepsute jedzenie,
              <br />- ziemia, żwir, kamienie, 2
              <br />- części chorych roślin lub rośliny zaatakowane przez
              pasożyty (zarodniki grzybów lub jaja pasożytów może przetrwać
              proces kompostowania i zostać ponownie wprowadzony do gleby)
              <br />- chwasty, które stworzyły nasiona (nasiona przetrwają w
              kompoście i wykiełkują gleba pokryta kompostem)
              <br />- grube gałęzie i igły sosnowe – długo się rozkładają,
              wydłużając czas potrzebne do wytworzenia kompostu,
              <br />- odpady pochodzenia roślinnego, które mogą być skażone, np.
              chwasty środkami ochrony roślin lub skórki z owoców cytrusowych,
              które zawierają konserwanty.
            </SectionText>
          </SectionContainer>
        </main>
      </div>
      <footer className="v-max flex items-center justify-center bg-neutral-800 py-6 text-3xl text-neutral-200">
        Footer
      </footer>
    </div>
  );
}
