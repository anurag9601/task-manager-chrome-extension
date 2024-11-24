import { useEffect, useRef, useState } from "react";
import styles from "./ContentPage.module.css";
import { IoIosAddCircle } from "react-icons/io";
import { TbBrandPushover } from "react-icons/tb";
import { TbHeading } from "react-icons/tb";
import { FaCheckSquare } from "react-icons/fa";

const ContentPage = () => {
  const taskManagerBoxRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [offset, setOffset] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    function handleMouseDown(e: MouseEvent) {
      if (taskManagerBoxRef.current?.contains(e.target as Node)) {
        setIsDragging(true);
        setOffset({
          x: e.clientX - taskManagerBoxRef.current?.offsetLeft,
          y: e.clientY - taskManagerBoxRef.current?.offsetTop,
        });
      }
    }

    function handleMouseMove(e: MouseEvent) {
      if (isDragging && taskManagerBoxRef.current) {
        const newLeft = e.clientX - offset.x;
        const newTop = e.clientY - offset.y;
        taskManagerBoxRef.current!.style.top = `${newTop}px`;
        taskManagerBoxRef.current!.style.left = `${newLeft}px`;
      }
    }

    function handleMouseUp() {
      setIsDragging(false);
    }

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, offset]);

  return (
    <>
      {isDragging === true && (
        <div className={styles.taskManagerContainer}></div>
      )}
      <div className={styles.taskManagerBox} ref={taskManagerBoxRef}>
        <h4 className={styles.taskManagerBoxHead}>Task manager</h4>
        <hr className={styles.headBottomLine} />
        <div className={styles.tasksContainer}>
          <div className={styles.addBtn}>
            <IoIosAddCircle tabIndex={0} className={styles.createBtn}/>
            <ul className={styles.createOptions}>
              <li><TbHeading/> Head</li>
              <li><TbBrandPushover/> Paragraph</li>
              <li><FaCheckSquare /> Checklist</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContentPage;
