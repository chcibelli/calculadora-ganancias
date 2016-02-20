$(function() {

	var impuesto2015 = 0;
	var sn2015 = 0;

	var impuesto2016 = 0;
	var sn2016 = 0;

	$("#calcular-btn").click(function() {

		var e = parseFloat($("#sueldo2015").val());
		var a = parseFloat($("#sueldo2013").val());

		if ((e != "" && e > 0) && (a != "" && a > 0)) {
			calculaIIGG();
			calculaIIGG2016();

			diferencia = Math.round(sn2016 - sn2015);
			
			console.log('sueldo neto 15 -> ' + sn2015);
			console.log('sueldo neto 16 -> ' + sn2016);

			if (diferencia > 0) {
				$('#diferencia_resultado').html('TU SUELDO NETO: ');
				$('#diferencia').html("+ $ " + diferencia);
			}

			if (diferencia < 0) {
				$('#diferencia_resultado').html('TU SUELDO NETO: ');
				$('#diferencia').html(" - $ " + diferencia);
			}

			if (diferencia == 0) {
				$('#diferencia_resultado').html('TU SUELDO NO TIENE CAMBIOS: ');
			}

		} else {
			alert("Ingresá tu sueldo bruto mensual en Pesos Argentinos para ambos periodos");
			return false;
		}
	})
	function calculaIIGG2016() {

		var topeAportes = 43202.17;
		var sb15 = $('#sueldo2015').val();
		var deducciones = 0;
		var impuesto = 0;
		var patagonia = $('#patagonia').is(':checked');
		var autonomo = $('#autonomo').is(':checked');

		if (sb15 <= topeAportes) {
			ayc = Math.round((sb15 * 0.11) + (sb15 * 0.06));
		} else {
			ayc = Math.round((topeAportes * 0.11) + (topeAportes * 0.06));
		}

		if (sb15 <= 30000) {

			sn = Math.round(sb15 - ayc);
			$('#aportes').html("$ -" + ayc);
			$('#impuesto_2016').html("$ " + 0);
			$('#sueldo_neto_2016').html("$ " + sn);
			
			impuesto2016 = 0;
			sn2016 = sn;
			
			return false;

		}

		sn = Math.round(sb15 - ayc);

		var isCasado = $('#estado_civil').val();
		var qHijos = $('#qhijos').val();
		var qAcargo = $('#qacargo').val();

		var escalas = [15000, 18000, 21000, 22000, 23000, 24000, 25000];
		var gnia = [0, 833.33, 1666.67, 2500, 5000, 7500, 10000];
		var gniam = [0, 75, 191.67, 350, 925, 1600, 2375];
		var gniap = [0.09, 0.14, 0.19, 0.23, 0.27, 0.31, 0.35];

		if (!patagonia) {
			var gni = [3526.50, 3526.50, 3526.50, 3526.50, 3526.50, 3526.50, 3526.50];
			var casado = [3314.83, 3314.83, 3314.83, 3314.83, 3314.83, 3314.83, 3314.83];
			var hijos = [1657.41, 1657.41, 1657.41, 1657.41, 1657.41, 1657.41, 1657.41];
			var cargas = [810, 777, 60, 745.20, 712.80, 696.60, 680.40, 540];
			var despecial = [16927, 16927, 16927, 16927, 16927, 16927, 16927, 16927];
		}

		for (var i = 0; i < escalas.length; i++) {
			if (sb15 >= escalas[escalas.length - 1]) {
				var index = escalas.length - 1;
				break;
			}
			if (sb15 >= escalas[i] && sb15 <= escalas[i + 1]) {
				var index = i;
				break;
			}
		}

		deducciones = deducciones + gni[index];

		if (isCasado > 0) {
			deducciones = deducciones + casado[index];
		}

		if (qHijos > 0) {
			deducciones = deducciones + (hijos[index] * qHijos);
		}

		if (qAcargo > 0) {
			deducciones = deducciones + (cargas[index] * qAcargo);
		}

		if (!autonomo) {
			deducciones = deducciones + despecial[index];
		}

		var gisi = sn - deducciones;

		for (var i = 0; i < gnia.length; i++) {
			if (gisi >= gnia[i] && gisi <= gnia[i + 1]) {
				var indexg = i;
				break;
			}
		}

		if ( typeof indexg == 'undefined') {
			indexg = gnia.length - 1;
		}

		impuesto = Math.round(gniam[indexg] + ((gisi - gnia[indexg]) * gniap[indexg]));

		sn = Math.round(sb15 - ayc - impuesto);

		$('#impuesto_2016').html("$ " + impuesto);
		$('#aportes').html("$ " + ayc);
		$('#sueldo_neto_2016').html("$ " + sn);

		impuesto2016 = impuesto;
		sn2016 = sn;

	}

	function calculaIIGG() {

		var topeAportes = 43202.17;
		var sb13 = $('#sueldo2013').val();
		var sb15 = $('#sueldo2015').val();
		var deducciones = 0;
		var impuesto = 0;
		var patagonia = $('#patagonia').is(':checked');
		var autonomo = $('#autonomo').is(':checked');

		if (sb15 <= topeAportes) {
			ayc = Math.round((sb15 * 0.11) + (sb15 * 0.06));
		} else {
			ayc = Math.round((topeAportes * 0.11) + (topeAportes * 0.06));
		}

		if (sb13 <= 15000) {
			sn = Math.round(sb15 - ayc);
			$('#impuesto_2015').html("$ " + 0);
			$('#sueldo_neto_2015').html("$ " + sn);

			return true;

		} else {

			if (sb15 <= 15000) {

				sn = Math.round(sb15 - ayc);
				$('#impuesto_2015').html("$ " + 0);
				$('#sueldo_neto_2015').html("$ " + sn);
				return false;

			}

			sn = Math.round(sb15 - ayc);

			var isCasado = $('#estado_civil').val();
			var qHijos = $('#qhijos').val();
			var qAcargo = $('#qacargo').val();

			var escalas = [15000, 18000, 21000, 22000, 23000, 24000, 25000];
			var gnia = [0, 833.33, 1666.67, 2500, 5000, 7500, 10000];
			var gniam = [0, 75, 191.67, 350, 925, 1600, 2375];
			var gniap = [0.09, 0.14, 0.19, 0.23, 0.27, 0.31, 0.35];

			if (!patagonia) {
				var gni = [1944, 1866.24, 1788.48, 1710.72, 1671.84, 1632.96, 1296];
				var casado = [2160, 2073.60, 1987.20, 1900.80, 1857.24, 1814.40, 1440];
				var hijos = [1080, 1036.80, 993.60, 950.40, 928.80, 907.20, 720];
				var cargas = [810, 777, 60, 745.20, 712.80, 696.60, 680.40, 540];
				var despecial = [9331.20, 8957.25, 8584.70, 8211.46, 8024.83, 7838.21, 6220, 80];
			} 
			
			for (var i = 0; i < escalas.length; i++) {
				if (sb13 >= escalas[escalas.length - 1]) {
					var index = escalas.length - 1;
					break;
				}
				if (sb13 >= escalas[i] && sb13 <= escalas[i + 1]) {
					var index = i;
					break;
				}
			}

			deducciones = deducciones + gni[index];

			if (isCasado > 0) {
				deducciones = deducciones + casado[index];
			}

			if (qHijos > 0) {
				deducciones = deducciones + (hijos[index] * qHijos);
			}

			if (qAcargo > 0) {
				deducciones = deducciones + (cargas[index] * qAcargo);
			}

			if (!autonomo) {
				deducciones = deducciones + despecial[index];
			}

			var gisi = sn - deducciones;

			for (var i = 0; i < gnia.length; i++) {
				if (gisi >= gnia[i] && gisi <= gnia[i + 1]) {
					var indexg = i;
					break;
				}
			}

			if ( typeof indexg == 'undefined') {
				indexg = gnia.length - 1;
			}

			impuesto = Math.round(gniam[indexg] + ((gisi - gnia[indexg]) * gniap[indexg]));

			sn = Math.round(sb15 - ayc - impuesto);

			$('#impuesto_2015').html("$ -" + impuesto);
			$('#sueldo_neto_2015').html("$ " + sn);

			impuesto2015 = impuesto;
			sn2015 = sn;

		}

	}

});
