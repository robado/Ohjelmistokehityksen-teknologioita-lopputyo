package guitar;

import guitar.domain.Guitar;
import guitar.domain.GuitarRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class GuitarCrudApplication {

    public static void main(String[] args) {
        SpringApplication.run(GuitarCrudApplication.class, args);
    }

    @Bean
    public CommandLineRunner guitar(GuitarRepository repository) {
        return (args) -> {
            repository.save(new Guitar("Jackson", "Pro Series", 6, 1.292));
            repository.save(new Guitar("Jackson", "Pro Series", 6, 1.292));
            repository.save(new Guitar("Jackson", "Pro Series", 6, 1.292));
            repository.save(new Guitar("Jackson", "Pro Series", 6, 1.292));
            repository.save(new Guitar("Jackson", "Pro Series", 6, 1.292));
        };
    }
}
