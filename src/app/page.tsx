"use client";

import { useEffect, useMemo, useState } from "react";

interface Surprise {
  day: number;
  surprise: string;
  embedGIF: string;
}

const surprises: Surprise[] = [
  {
    day: 17,
    surprise: "jóóóó nagy pohár házi forró csoki!",
    embedGIF: "https://giphy.com/embed/WmkqburJqXziM",
  },
  {
    day: 3,
    surprise: "meseszerű, közös gyertyaöntés!",
    embedGIF: "https://giphy.com/embed/9w475hDWEPVlu",
  },
  {
    day: 24,
    surprise: "",
    embedGIF: "",
  },
  {
    day: 12,
    surprise: "edzs ínycsiklandó, ámdebár cukormentes finomság: caramea!",
    embedGIF: "https://giphy.com/embed/l0MYw0DsFJc0kU0Jq",
  },
  {
    day: 9,
    surprise: "utánozhatatlan lábmasszázs kupon!",
    embedGIF: "https://giphy.com/embed/WqtgbDR0bCkms",
  },
  {
    day: 1,
    surprise: "mikis-minis karifadísz!",
    embedGIF: "https://giphy.com/embed/l0MYw0DsFJc0kU0Jq",
  },
  {
    day: 20,
    surprise: "incsi fincsi gumicukor!",
    embedGIF: "https://giphy.com/embed/1fm29sYp7a4h1HxtgC",
  },
  {
    day: 10,
    surprise: "szuperizginek ígérkező, közös mézeskalács sütés!",
    embedGIF: "https://giphy.com/embed/xT9Igtvkzd2z4N6c2Q",
  },
  {
    day: 6,
    surprise: "szerelmetes közös üvegfestős délután!",
    embedGIF: "https://giphy.com/embed/FhcAZGmwsUegBaLMni",
  },
  { day: 22, surprise: "", embedGIF: "" },
  {
    day: 4,
    surprise: "pénisz alakú sütikiszúró forma!!!",
    embedGIF: "https://giphy.com/embed/H5Ooe4b04mkawWC8KN",
  },
  { day: 21, surprise: "közös gyöngyfűzős délután!", embedGIF: "" },
  {
    day: 8,
    surprise: "látogatás a Karácsonyházban!",
    embedGIF: "https://giphy.com/embed/RlkxV4vKnKqtXLj2qw",
  },
  {
    day: 15,
    surprise: "csatangolás a Városligetben, puncsozás, korizó-stalking!",
    embedGIF: "",
  },
  {
    day: 2,
    surprise: "utánozhatatlan lábmasszázs kupon!",
    embedGIF: "https://giphy.com/embed/LBAv3HJDl2WwU",
  },
  {
    day: 13,
    surprise: "csodálatos emlék Kamilláról!",
    embedGIF: "https://giphy.com/embed/xT0xeMA62E1XIlup68",
  },
  {
    day: 5,
    surprise: "ínycsiklandó svéd húsgolyós vacsi és a Frozen!",
    embedGIF: "https://giphy.com/embed/l2YWluoNgk342F3k4",
  },
  {
    day: 18,
    surprise: "egy adag cukkeromentes nasi-masi!",
    embedGIF: "https://giphy.com/embed/xT0xeMA62E1XIlup68",
  },
  {
    day: 19,
    surprise: "utánozhatatlan lábmasszázs kupon!",
    embedGIF: "https://giphy.com/embed/xTiN0CNHgoRf1Ha7CM",
  },
  {
    day: 7,
    surprise: "csodálatos, pihe-puha karácsonyi ágynemű!",
    embedGIF: "https://giphy.com/embed/9JrvLb0fnrn7k1ZjhX",
  },
  {
    day: 11,
    surprise:
      "egy naaaaagy tál nachos sajtszósszal vagy salsával és egy felejthetetlen moziest választható filmmel",
    embedGIF: "https://giphy.com/embed/EqjqXkrEb9XNEJam1A",
  },
  {
    day: 14,
    surprise:
      "nagy kóborlás a karácsonyi vásárban (szabadon választható, hol)!",
    embedGIF: "",
  },
  {
    day: 16,
    surprise: "utánozhatatlan lábmasszázs kupon!",
    embedGIF: "https://giphy.com/embed/xTiN0CNHgoRf1Ha7CM",
  },
  { day: 23, surprise: "utánozhatatlan lábmasszázs kupon!", embedGIF: "" },
];

function AdventCalendar() {
  const [openedWindows, setOpenedWindows] = useState<boolean[]>(
    Array(24).fill(false)
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [currentWindow, setCurrentWindow] = useState<number | null>(null);
  const [modalTransition, setModalTransition] = useState(false);
  const currentDay: number = new Date().getDate();
  const [warnModalOpen, setWarnModalOpen] = useState<boolean>(false);
  const [hideAll, setHideAll] = useState<boolean>(false);

  // Load state from localStorage on component mount
  useEffect(() => {
    const storedData = localStorage.getItem("openedWindows");
    if (storedData) {
      setOpenedWindows(JSON.parse(storedData));
    }
  }, []);

  const handleClick = (index: number) => {
    if (currentDay < index && !openedWindows[index]) {
      setWarnModalOpen(true);
      setTimeout(() => setModalTransition(true), 50);
      return;
    }

    const updatedOpenedWindows = openedWindows.map((opened, i) =>
      i === index ? true : opened
    );
    setOpenedWindows(updatedOpenedWindows);
    localStorage.setItem("openedWindows", JSON.stringify(updatedOpenedWindows));

    // Open the modal and set the current window
    setModalOpen(true);
    setCurrentWindow(index);
    setTimeout(() => setModalTransition(true), 50); // Add a slight delay for transition to trigger
  };

  const closeModal = () => {
    setModalTransition(false);
    setTimeout(() => {
      setModalOpen(false);
      setCurrentWindow(null);
    }, 300); // Wait for transition to finish before closing modal
  };

  const currentSurprise = useMemo(
    () => surprises.find((sur) => sur.day === currentWindow),
    [currentWindow]
  );

  return (
    <div
      className="flex flex-col items-center pt-4 w-full h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/IMG_4867.jpg')",
      }}
    >
      <h1
        onClick={() => setHideAll(!hideAll)}
        className="text-3xl font-bold mb-6 text-white text-center"
      >
        Lili adventi kalendáriuma
      </h1>
      {!hideAll && (
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-8 w-full max-w-2xl p-4">
          {surprises.map(({ day }) => (
            <div
              key={day}
              onClick={() => handleClick(day)}
              className={`flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 cursor-pointer text-white font-semibold rounded-lg shadow-lg transition-transform transform ${
                openedWindows[day]
                  ? "bg-yellow-300 text-gray-800 rotate-y-180"
                  : "bg-orange-700"
              }`}
            >
              {day}
            </div>
          ))}
        </div>
      )}

      {/* Modal with transition */}
      {modalOpen && currentWindow !== null && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity ${
            modalTransition ? "opacity-100" : "opacity-0"
          } duration-300 ease-in-out`}
        >
          <div
            className={`m-4 bg-orange-700 p-6 rounded-lg max-w-md w-full text-center transform transition-all flex flex-col items-center ${
              modalTransition ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            <h2 className="text-xl font-bold mb-4 text-yellow-300">
              Advent, {currentWindow}. nap
            </h2>
            <p className="text-lg text-yellow-300">
              A mai nap meglepetése nem más, mint egy{" "}
              {currentSurprise?.surprise || ""}
            </p>
            <iframe
              src={currentSurprise?.embedGIF}
              width="240"
              height="132"
            ></iframe>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-yellow-300 text-gray-800 rounded-lg hover:bg-yellow-400"
            >
              Bezárom
            </button>
          </div>
        </div>
      )}
      {warnModalOpen && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity ${
            modalTransition ? "opacity-100" : "opacity-0"
          } duration-300 ease-in-out`}
        >
          <div
            className={`m-4 bg-orange-700 p-6 rounded-lg max-w-md w-full text-center transform transition-all flex flex-col items-center ${
              modalTransition ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            <h2 className="text-xl font-bold mb-4 text-yellow-300">
              Ho-ho-Hóóó!
            </h2>
            <p className="text-lg text-yellow-300">
              Álljunk meg egy szóra! Kit ért a Mikulás egy kis kíváncsiságba
              ültetett csaláson? Vigyázz! A rosszgyerekek jutalma nem mogyoró és
              banán, hanem virgács, ostor meg bilincs!
            </p>
            <iframe
              src="https://giphy.com/embed/JnkucpCZMvr8Y"
              width="240"
              height="132"
            ></iframe>

            <button
              onClick={() => setWarnModalOpen(false)}
              className="mt-4 px-4 py-2 bg-yellow-300 text-gray-800 rounded-lg hover:bg-yellow-400"
            >
              Bezárom
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <AdventCalendar />
    </main>
  );
}
