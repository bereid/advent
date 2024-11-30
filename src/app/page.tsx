"use client";

import { useEffect, useMemo, useState } from "react";

interface Surprise {
  day: number;
  surprise: string;
}

const surprises: Surprise[] = [
  { day: 17, surprise: "jóóóó nagy pohár házi forró csoki!" },
  { day: 3, surprise: "meseszerű, közös gyertyaöntés!" },
  { day: 24, surprise: "bolondfinom karácsonyos gumicukor!" },
  { day: 12, surprise: "csodálatos, pihe-puha karácsonyi ágynemű!" },
  { day: 9, surprise: "utánozhatatlan lábmasszázs kupon!" },
  { day: 1, surprise: "mikis-minis karifadísz!" },
  { day: 20, surprise: "moziest választható filmmel és nachosszal!" },
  {
    day: 10,
    surprise:
      "nagy kóborlás a karácsonyi vásárban (szabadon választható, hol)!",
  },
  { day: 6, surprise: "közös gyöngyfűzős délután!" },
  { day: 22, surprise: "naaaagy mézi párna!" },
  { day: 4, surprise: "csodálatos emlék Kamilláról!" },
  { day: 21, surprise: "bolondos kigurítható gyerekrágó!" },
  { day: 8, surprise: "mikulás virág! (Tudjuk, hogy életben tudod tartani!)" },
  { day: 15, surprise: "csodálatos karácsonyi ágynemű" },
  { day: 2, surprise: "utánozhatatlan lábmasszázs kupon!" },
  { day: 13, surprise: "pénisz alakú sütikiszúró forma!!!" },
  { day: 5, surprise: "ínycsiklandó svéd húsgolyós vacsi és a Frozen!" },
  { day: 18, surprise: "pihentő, lazító kismama masszázs!" },
  { day: 19, surprise: "utánozhatatlan lábmasszázs kupon!" },
  { day: 7, surprise: "látogatás a Karácsonyházban!" },
  { day: 11, surprise: "szerelmetes közös üvegfestős délután!" },
  { day: 14, surprise: "szuperizginek ígérkező, közös mézeskalács sütés!" },
  { day: 16, surprise: "utánozhatatlan lábmasszázs kupon!" },
  { day: 23, surprise: "utánozhatatlan lábmasszázs kupon!" },
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
    if (currentDay !== index && !openedWindows[index]) {
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
            className={`m-4 bg-orange-700 p-6 rounded-lg max-w-md w-full text-center transform transition-all ${
              modalTransition ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            <h2 className="text-xl font-bold mb-4 text-yellow-300">
              Advent, {currentWindow + 1}. nap
            </h2>
            <p className="text-lg text-yellow-300">
              A mai nap meglepetése nem más, mint egy{" "}
              {currentSurprise?.surprise || ""}
            </p>
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
