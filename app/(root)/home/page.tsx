import MeetingTypeList from '@/components/MeetingTypeList';
import { format, toZonedTime } from 'date-fns-tz';

const Home = () => {
  // Define the time zone you want to use
  const timeZone = 'Asia/Kolkata';

  // Get the current date in UTC and convert it to the specified time zone
  const now = new Date();
  const zonedDate = toZonedTime(now, timeZone);

  // Format the date and time according to your needs
  const time = format(zonedDate, 'hh:mm a', { timeZone });
  const date = format(zonedDate, 'EEEE, MMMM d, yyyy', { timeZone });

  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'>
        <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11'>
          <h2 className='glassmorphism max-w-[270px] rounded-xl py-2 text-center text-base font-normal'>
            Upcoming meeting at 12:30 PM
          </h2>
          <div className='flex flex-col gap-2'>
            <h1 className='text-4xl font-extrabold lg:text-5xl'>
              {`${time}`}
            </h1>
            <p className='text-lg font-medium text-sky-1 lg:text-2xl'>{`${date}`}</p>
          </div>
        </div>
      </div>
      <MeetingTypeList />
    </section>
  )
}

export default Home;
