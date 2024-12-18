Feature: Search a course
    
    Scenario: Booking tickets for the movie Stalker
        Given пользователь на "https://qamid.tmweb.ru/client/index.php" странице
        When пользователь выбирает день недели 
        When пользователь выбирает время и зал на фильм Сталкер
        When пользователь выбирает место в зале
        When пользователь нажимает кнопку забронировать
        Then пользователь видит страницу "Вы выбрали билеты:"
    
    Scenario: Purchase tickets for vip seats
        Given пользователь на "https://qamid.tmweb.ru/client/index.php" странице
        When пользователь выбирает день недели
        When пользователь выбирает время и зал в вип зал
        When пользователь выбирает место в вип зале
        When пользователь нажимает кнопку забронировать
        Then пользователь видит страницу с указанной суммой "Стоимость: 1000 руб."
    
    Scenario: Attempt to book an already booked seat
        Given пользователь на "https://qamid.tmweb.ru/client/index.php" странице
        When пользователь выбирает день недели
        When пользователь выбирает время и зал на фильм Сталкер
        When пользователь выбирает забронированое место
        Then невозможно нажать кнопку забронировать