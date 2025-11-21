import { AddTask } from "@/components/AddTask";
import { DateTimeFilter } from "@/components/DateTimeFilter";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StatsAndFilter } from "@/components/StatsAndFilter";
import { TaskList } from "@/components/TaskList";
import { TaskListPagination } from "@/components/TaskListPagination";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";
import api from "@/lib/axios";
import { visibleTaskLimit } from "@/lib/data";

const Homepage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  const [filter, setFilter] = useState(`all`);
  const [dateQuerry, setDateQuery] = useState(`today`);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fecthTasks();
  }, [dateQuerry]);

  useEffect(() => {
    setPage(1);
  }, [filter, dateQuerry]);

  // Lấy danh sách nhiệm vụ từ API

  const fecthTasks = async () => {
    try {
      const res = await api.get(`/tasks?filter=${dateQuerry}`);
      setTaskBuffer(res.data.tasks);
      setActiveTaskCount(res.data.activeCount);
      setCompletedTaskCount(res.data.completedCount);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Đã xảy ra lỗi khi tải nhiệm vụ.");
    }
  };
  const handleTaskChange = () => {
    fecthTasks();
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Biến
  const filteredTasks = taskBuffer.filter((task) => {
    switch (filter) {
      case "active":
        return task.status === "active";
      case "completed":
        return task.status === "complete";
      default:
        return true;
    }
  });

  const visibleTasks = filteredTasks.slice(
    (page - 1) * visibleTaskLimit,
    page * visibleTaskLimit
  );

  if (visibleTasks.length === 0) {
    handlePrev();
  }

  const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);

  return (
    <div className="min-h-screen w-full bg-[#fefcff] relative">
      {/* Dreamy Sky Pink Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
        radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
        }}
      />
      {/* Your Content/Components */}
      <div className="container pt-8 mx-auto relative z-10">
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
          {/* Đầu Trang */}
          <Header />

          {/* Thêm Nhiệm Vụ Mới */}
          <AddTask handleNewTaskAdded={handleTaskChange} />

          {/* Thống Kê và Bộ Lọc Nhiệm Vụ */}
          <StatsAndFilter
            filter={filter}
            setFilter={setFilter}
            activeTasksCount={activeTaskCount}
            completedTasksCount={completedTaskCount}
          />

          {/* Danh Sách Nhiệm Vụ */}
          <TaskList
            filteredTasks={visibleTasks}
            filter={filter}
            handleTaskChange={handleTaskChange}
          />

          {/* Phân Trang Danh Sách Nhiệm Vụ */}
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <TaskListPagination
              handleNext={handleNext}
              handlePrev={handlePrev}
              handlePageChange={handlePageChange}
              page={page}
              totalPages={totalPages}
            />
            <DateTimeFilter
              dateQuerry={dateQuerry}
              setDateQuery={setDateQuery}
            />
          </div>

          {/* Chân Trang */}
          <Footer
            activeTaskCount={activeTaskCount}
            completedTaskCount={completedTaskCount}
          />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
