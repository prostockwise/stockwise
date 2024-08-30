const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const navigateDate = (currentDate: Date, days: number) => {
  const newDate = new Date(currentDate);
  newDate.setDate(newDate.getDate() + days);
  setCurrentDate(newDate);
};

export function DateNav() {
  return (
    <div className="flex justify-between items-center mb-8">
      <Button onClick={() => navigateDate(-1)} variant="outline" size="icon">
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous Day</span>
      </Button>
      <h2 className="text-2xl font-semibold">{formatDate(currentDate)}</h2>
      <Button onClick={() => navigateDate(1)} variant="outline" size="icon">
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next Day</span>
      </Button>
    </div>
  );
}
