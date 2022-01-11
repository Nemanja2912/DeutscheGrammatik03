import { useReducer } from "react";

let initState = {
  x: 0,
  y: 0,
  transition: 0,
  zIndex: 1,
  isDone: false,
  indicator: { active: false, wrong: false },
};

let ACTION_TYPE = {
  MOVE: "MOVE",
  TRANSITION: "TRANSITION",
  IS_DONE: "IS_DONE",
  RESET: "RESET",
  CUSTOM: "CUSTOM",
  INDICATOR: "INDICATOR",
};

let moveReduce = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.MOVE:
      return {
        ...state,
        x: action.payload.x,
        y: action.payload.y,
        zIndex: 200,
      };
    case ACTION_TYPE.IS_DONE:
      return {
        ...state,
        isDone: action.payload.isDone,
      };
    case ACTION_TYPE.TRANSITION:
      return {
        ...state,
        transition: action.payload.transition,
      };
    case ACTION_TYPE.RESET:
      return {
        ...state,
        x: 0,
        y: 0,
        transition: action.payload.transition,
        zIndex: 1,
      };
    case ACTION_TYPE.INDICATOR:
      return { ...state, indicator: action.payload.indicator };
    case ACTION_TYPE.CUSTOM:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const useMove = (
  ref = false,
  customDropPosition = false,
  transitionDuration = 200
) => {
  const [moveState, dispatchMove] = useReducer(moveReduce, initState);

  const setTransition = (transition) => {
    dispatchMove({
      type: ACTION_TYPE.TRANSITION,
      payload: {
        transition: transition,
      },
    });
  };

  const moveElement = (x, y) => {
    dispatchMove({
      type: ACTION_TYPE.MOVE,
      payload: {
        x,
        y,
      },
    });
  };

  const setIndicator = (state) => {
    dispatchMove({
      type: ACTION_TYPE.INDICATOR,
      payload: {
        indicator: { ...moveState.indicator, ...state },
      },
    });
  };

  const resetElement = (transition) => {
    setIndicator({ active: true, wrong: true });

    setTimeout(() => {
      setIndicator({ active: false });
    }, 1000);
    dispatchMove({
      type: ACTION_TYPE.RESET,
      payload: {
        transition: transition,
      },
    });
  };

  const handleMove = (initEvent) => {
    if (moveState.isDone) return;

    setTransition(0);

    let leftPos = initEvent.target.getBoundingClientRect().left;
    let topPos = initEvent.target.getBoundingClientRect().top;

    const mouseMove = (event) => {
      let x = event.clientX - initEvent.clientX + moveState.x;
      let y = event.clientY - initEvent.clientY + moveState.y;

      moveElement(x, y);
    };
    document.addEventListener("mousemove", mouseMove);

    const mouseUp = (eventEnd) => {
      document.removeEventListener("mousemove", mouseMove);

      if (
        ref &&
        eventEnd.clientX > ref.current.getBoundingClientRect().left &&
        eventEnd.clientX < ref.current.getBoundingClientRect().right &&
        eventEnd.clientY > ref.current.getBoundingClientRect().top &&
        eventEnd.clientY < ref.current.getBoundingClientRect().bottom
      ) {
        let x, y;
        if (customDropPosition) {
          x = customDropPosition[0] - leftPos + moveState.x;
          y = customDropPosition[1] - topPos + moveState.y;
        } else {
          x = ref.current.getBoundingClientRect().left - leftPos + moveState.x;
          y = ref.current.getBoundingClientRect().top - topPos + moveState.y;
        }

        setTransition(transitionDuration);
        moveElement(x, y);

        dispatchMove({
          type: ACTION_TYPE.CUSTOM,
          payload: {
            zIndex: 1,
          },
        });

        setIndicator({ active: true, wrong: false });

        setTimeout(() => {
          setIndicator({ active: false });
        }, 1000);

        dispatchMove({
          type: ACTION_TYPE.IS_DONE,
          payload: {
            isDone: true,
          },
        });
      } else {
        resetElement(transitionDuration);

        setTimeout(() => {
          resetElement(0);
        }, transitionDuration);
      }

      document.removeEventListener("mouseup", mouseUp);
    };

    document.addEventListener("mouseup", mouseUp);
  };

  return [{ ...moveState }, handleMove, dispatchMove];
};

export default useMove;
