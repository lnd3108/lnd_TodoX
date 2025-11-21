export const Footer = ({ completedTaskCount = 0, activeTaskCount = 0 }) => {
  return (
    <>
      {completedTaskCount + activeTaskCount > 0 && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {completedTaskCount > 0 && (
              <>
                🎉 Tuyệt vời! Bạn đã hoàn thành {completedTaskCount} nhiệm vụ.
                {activeTaskCount > 0 &&
                  ` Còn lại ${activeTaskCount} nhiệm vụ đang chờ bạn hoàn thành.Cố gắng lên nhé!`}
              </>
            )}

            {completedTaskCount === 0 && activeTaskCount > 0 && (
              <>
                Bạn còn {activeTaskCount} nhiệm vụ chưa hoàn thành. Hãy bắt đầu
                thôi!
              </>
            )}
          </p>
        </div>
      )}
    </>
  );
};
