// Marcas de veículos atendidas pela loja. Não indica parceria oficial com as fabricantes.
// Para exibir o logotipo, coloque o arquivo em src/assets/brands/<slug>.svg (ou .png/.webp) — usa o slug abaixo.
export const carBrands = [
  'Volkswagen', 'Chevrolet', 'Fiat', 'Toyota', 'Honda', 'Hyundai', 'Ford', 'Renault', 'Nissan',
  'Jeep', 'Peugeot', 'Citroën', 'BYD', 'GWM', 'Mitsubishi', 'Kia', 'BMW', 'Mercedes-Benz',
  'Audi', 'Volvo', 'Caoa Chery', 'Lexus', 'Subaru', 'Land Rover', 'Porsche', 'Suzuki', 'RAM',
  'Mini', 'Jaguar', 'JAC',
].map((name) => ({
  name,
  slug: name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-'),
}))
