package guitar.domain;

import javax.persistence.*;

@Entity
public class Guitar {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String modelname;
    private String series;
    private int strings;
    private Double price;
    private String img;

    public Guitar() {
    }

    public Guitar(String modelname, String series, int strings, Double price, String img) {
        this.modelname = modelname;
        this.series = series;
        this.strings = strings;
        this.price = price;
        this.img = img;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getModelname() {
        return modelname;
    }

    public void setModelname(String modelname) {
        this.modelname = modelname;
    }

    public String getSeries() {
        return series;
    }

    public void setSeries(String series) {
        this.series = series;
    }

    public int getStrings() {
        return strings;
    }

    public void setStrings(int strings) {
        this.strings = strings;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

}
