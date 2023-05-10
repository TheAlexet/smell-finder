import './InstructionsScreen.css';

const InstructionsScreen = () => {
  return (
    <div className="instructions_screen">
      <div className="instructions_screen_text_container">
        <div className="instructions_screen_text">
          1. Se descarga el archivo test_results de https://zenodo.org/record/5014076#.Y-sadnZBzcd. Ahi están todos los métodos de todos los proyectos clasificados como flaky/non-flaky
        </div>
        <div className="instructions_screen_text">
          2. Se ejecuta "python get_test_flakiness.py test_results.csv" para parsear test_results y obtener test_results_parsed.csv
        </div>
        <div className="instructions_screen_text">
          3. Se clonan todos los proyectos de github utilizando JNose.
        </div>
        <div className="instructions_screen_text">
          4. Se analizan todos los proyectos con JNose por Test smell
        </div>
        <div className="instructions_screen_text">
          5. Se descarga  result_byclasstest_testsmells.csv desde JNose con todos los test smells encontrados en todos los proyectos, y el método donde se han encontrado
        </div>
        <div className="instructions_screen_text">
          6. Se ejecuta "python get_test_smells.py result_byclasstest_testsmells.csv" para hacer un csv en el que se obtiene, para todos los proyectos, para cada método, todos los test smells encontrados y se combina con test_results_parsed.csv
        </div>
        <div className="instructions_screen_text">
          7. Como resultado, se obtiene jnose_results.csv, un archivo con todos los métodos de todos los proyectos con el siguiente formato: Nombre del proyecto / Nombre del método / Es flaky? / Test smell 1 / Test smell 2 / Test smell N
        </div>
      </div>
    </div>
  );
}

export default InstructionsScreen;
