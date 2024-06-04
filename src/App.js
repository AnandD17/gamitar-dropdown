import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import Rain from "./assets/weather1.svg";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import { FaArrowLeft } from "react-icons/fa";

function App() {

  const [flag, setFlag] = useState(false);

  const [selectedList, setSelectedList] = useState(null);

  const [selectionData, setSelectionData] = useState([
    {
      label: "Learner Activation",
      id: 1,
      children: [
        {
          label: "Welcome Message",
          value: false
        },
        {
          label: "Activation Duration",
          value: false
        },
        {
          label: "Q&A Duration",
          value: false
        },
      ]
    },
    {
      label: "Strategy & Planning",
      id: 2,
      children: [
        {
          label: "Duration",
          value: false
        },
        {
          label: "Subliminal Messages",
          value: false
        }
      ]
    },
    {
      label: "Evivve",
      id: 3,
      children: [
        {
          label: "Duration",
          value: false
        },
        {
          label: "Head Start",
          value: false
        },
        {
          label: "Consequence",
          value: false
        },
        {
          label: "Overall Difficulty",
          value: false
        },
        {
          label: "Pace",
          value: false
        },
      ]
    },
    {
      label: "Reflection",
      id: 4,
      children: [
        {
          label: "Duration",
          value: false
        },
        {
          label: "Reflection",
          value: false
        },
      ]
    },
    {
      label: "Debrief",
      id: 5,
      children: [
        {
          label: "Duration",
          value: false
        },
        {
          label: "Debrief Points",
          value: false
        },

      ]
    },
  ]);

  useEffect(() => {
    AOS.init();
  });

  return (
    <div className="min-h-screen p-4 text-black flex justify-end">
      <div className={`border rounded-md p-2 w-fit flex flex-col items-end transition-box h-fit ${flag ? 'fade-box' : 'fade-box-reverse'}`}>
        <button
          onClick={() => {
            setFlag(flag ? false : true);
          }}
          className="bg-blue-400 p-2 rounded-sm">
          {flag ? "View Less" : "View More"}
        </button>
        {
          !flag
            ? null
            : (
              <div className="transition-box-content-parent">
                {
                  !selectedList
                    ? <div className="flex flex-col gap-2 mt-5 fade-in transition-box-content"  key={selectedList}>
                      {
                        selectionData.map((item) => (
                          <div className="flex items-center gap-2 p-2" key={item.id}>
                            <input
                              type="checkbox"
                              name=""
                              id=""
                              checked={item.children.some(s => !s.value) ? false : true}
                              onChange={() => {
                                const arr = selectionData.map((s) => {
                                  if (s.id === item.id) {
                                    return {
                                      label: s.label,
                                      id: s.id,
                                      children: s.children.map((k) => {
                                        return ({
                                          label: k.label,
                                          value: s.children.some(l => !l.value) ? true : false
                                        });
                                      })
                                    };
                                  } else {
                                    return s;
                                  }
                                });
                                setSelectionData(arr);
                              }}
                            />
                            <p
                            className="cursor-pointer"
                              onClick={() => {
                                setFlag(true);
                                setSelectedList(item.id);
                              }}
                            >{item.label}</p>
                          </div>
                        ))
                      }
                    </div>
                    : <div className="fade-in transition-box-content" key={flag}>
                      <p className="font-bold flex items-center gap-3 cursor-pointer"
                        onClick={() => {
                          setSelectedList(null);
                        }}
                      >
                      <FaArrowLeft />
                        {
                          selectionData.find((s) => s.id === selectedList).label
                        }
                      </p>
                      <div className="flex flex-col gap-2 mt-5">
                        {
                          selectionData.find((s) => s.id === selectedList)?.children.map(item => (
                            <div className="flex items-center gap-2 p-2" key={item.label}>
                              <input
                                type="checkbox"
                                name=""
                                id=""
                                checked={item.value}
                                onChange={(e) => {
                                  const arr = selectionData.map((s) => {
                                    if (s.id === selectedList) {
                                      return ({
                                        label: s.label,
                                        id: s.id,
                                        children: s.children.map((j) => {
                                          if (j.label === item.label) {
                                            return ({
                                              label: j.label,
                                              value: e.target.checked
                                            });
                                          } else {
                                            return (j);
                                          }
                                        })
                                      });
                                    } else {
                                      return s;
                                    }
                                  });
                                  setSelectionData(arr);
                                }}
                              />
                              <p
                                onClick={() => {
                                  setSelectedList(null);
                                }}
                              >{item.label}</p>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                }
              </div>
            )
        }
      </div>
    </div>
  );
}

export default App;
